import React, {
  useContext, useEffect, useRef,
} from 'react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import {Modal, Button, Form, CloseButton} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { channelsSelectors } from '../../slices/channels';
import ApiContext from '../../contexts/apiContext';
import { closeModal, switchChannel } from '../../slices/ui';
import filter from "leo-profanity";

const ChannelsModal = () => {
  const { addChannel, renameChannel, removeChannel } = useContext(ApiContext);
  const inputEl = useRef(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channelNames = useSelector(channelsSelectors.selectAll).map((channel) => channel.name);
  const currentChannel = useSelector((state) => state.ui.currentChannel);
  const defaultChannel = useSelector((state) => state.ui.defaultChannel);
  const isModalOpen = useSelector((state) => state.ui.modalsState.isOpen);
  const modalType = useSelector((state) => state.ui.modalsState.modalType);
  const editingChannel = useSelector((state) => state.ui.modalsState.editingChannel);
  const channel = useSelector((state) => channelsSelectors.selectById(state, editingChannel));
  const showModal = isModalOpen;
  const editingChannelName = editingChannel ? channel.name : '';

  const channelNameSchema = Yup.object({
    name: Yup.string()
    .test(
      'name is duplicated',
      'channelNameIsDuplicated',
      (name) => !channelNames.includes(name),
    )
    .min(3, 'channelNameLength')
    .max(20, 'channelNameLength'),
  });

  useEffect(() => {
    if (inputEl.current) {
      inputEl.current.focus();
    }
  }, [showModal]);

  const formik = useFormik({
    initialValues: { name: modalType === 'rename' ? editingChannelName : '' },
    validationSchema: channelNameSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async ({ name }) => {
      try {
        formik.setSubmitting(true);
        switch (modalType) {
          case 'add':
            const filteredName = filter.clean(name);
            const {data} = await addChannel({name: filteredName});
            toast.success(t('modals.toast.add'));
            dispatch(switchChannel(data.id));
            break
          case 'rename':
            await renameChannel(editingChannel, name);
            toast.success(t('modals.toast.rename'));
            break
          case 'remove':
            await removeChannel(editingChannel);
            if (editingChannel === currentChannel) {
              dispatch(switchChannel(defaultChannel));
            }
            toast.success(t('modals.toast.remove'));
            break
          default:
            throw new Error(`Unexpected modal type ${modalType}`);
        }
        formik.setSubmitting(false);
        formik.resetForm();
        dispatch(closeModal());
      } catch {
        toast.error(t('socketErrors.timeout'));
        formik.setSubmitting(false);
        formik.resetForm();
        dispatch(closeModal());
      }
    }
  })

  const handleCloseModal = () => {
    formik.resetForm();
    dispatch(closeModal());
  };

  return (
    <Modal show={showModal} onHide={() => dispatch(closeModal())} centered>
      <Modal.Header>
        <Modal.Title>{t(`modals.channelModal.${modalType}`)}</Modal.Title>
        <CloseButton onClick={handleCloseModal}/>
      </Modal.Header>
      <Modal.Body>
        {modalType === 'remove' ?
          <p className="lead">{t('modals.channelModal.areYouSure')}</p>
          :
          <Form onSubmit={formik.handleSubmit}>
            <Form.Control
              onChange={formik.handleChange}
              ref={inputEl}
              name="name"
              id="name"
              className={`mb-2 ${formik.errors.name && formik.touched.name ? 'is-invalid' : ''}`}
            />
            <Form.Label
              className="visually-hidden"
              htmlFor="name"
            >
              {t('modals.channelModal.channelName')}
            </Form.Label>
            {formik.touched.name && formik.errors.name ?
              <div className="invalid-feedback">{t(`yupErrors.${formik.errors.name}`)}</div>
              :
              ''}
          </Form>
        }
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={handleCloseModal}>{t('modals.channelModal.cancel')}</Button>
          <Button variant={modalType === 'remove' ? 'danger' : 'primary'} onClick={formik.handleSubmit} type="submit">{t(`modals.channelModal.submit`)}</Button>
        </div>
      </Modal.Body>
    </Modal>
  )
};

export default ChannelsModal;
