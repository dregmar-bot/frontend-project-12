import React, {
  useContext, useEffect, useRef,
} from 'react';
import * as Yup from 'yup';
import filter from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { channelsSelectors } from '../../slices/channels';
import { switchChannel, closeModal } from '../../slices/ui';
import ApiContext from '../../contexts/apiContext';

const AddChannelModal = () => {
  const { addChannel } = useContext(ApiContext);
  const inputEl = useRef(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const channelNames = useSelector(channelsSelectors.selectAll).map((channel) => channel.name);
  const isModalOpen = useSelector((state) => state.ui.modalsState.isOpen);
  const modalType = useSelector((state) => state.ui.modalsState.modalType);

  const showModal = isModalOpen && modalType === 'add';

  const channelNameSchema = Yup.object({
    name: Yup.string()
    .required('isRequired')
      .test(
        'name is duplicated',
        'channelNameIsDuplicated',
        (name) => !channelNames.includes(name),
      )
      .min(3, 'channelNameLength')
      .max(20, 'channelNameLength'),
  });

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: channelNameSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async ({ name }) => {
      try {
        const filteredName = filter.clean(name);
        const { data } = await addChannel({ name: filteredName });
        toast.success(t('modals.toast.add'));
        dispatch(switchChannel(data.id));
        dispatch(closeModal());
      } catch {
        toast.error(t('socketErrors.timeout'));
      }
    }
  });

  useEffect(() => {
    if (inputEl.current) {
      inputEl.current.focus();
    }
  }, [showModal]);

  return (
    <Modal show={showModal} onHide={() => dispatch(closeModal())} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.channelModal.add')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Control
            onChange={formik.handleChange}
            ref={inputEl}
            name="name"
            id="name"
            value={formik.values.name}
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
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={() => dispatch(closeModal())}>{t('modals.channelModal.cancel')}</Button>
          <Button variant="primary" type="submit" disabled={formik.isSubmitting}>
            {t('modals.channelModal.submit')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
