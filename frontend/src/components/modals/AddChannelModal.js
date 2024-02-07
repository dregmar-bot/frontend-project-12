import React, {
  useState, useContext, useEffect, useRef,
} from 'react';
import * as Yup from 'yup';
import filter from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { channelsSelectors } from '../../slices/channels';
import { switchChannel, closeModal } from '../../slices/ui';
import ApiContext from '../../contexts/apiContext';

const AddChannelModal = () => {
  const [isLoading, setLoading] = useState(false);
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

  return (
    <Modal show={showModal} onHide={() => dispatch(closeModal())} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.channelModal.add')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: '' }}
          validationSchema={channelNameSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={async ({ name }) => {
            try {
              const filteredName = filter.clean(name);
              const { data } = await addChannel({ name: filteredName });
              toast.success(t('modals.toast.add'));
              setLoading(false);
              dispatch(switchChannel(data.id));
              dispatch(closeModal());
            } catch {
              toast.error(t('socketErrors.timeout'));
              setLoading(false);
            }
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div>
                <Field
                  name="name"
                  id="name"
                  required
                  innerRef={inputEl}
                  className={`mb-2 form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                >
                </Field>
                <label className="visually-hidden form-label" htmlFor="name">{t('modals.channelModal.channelName')}</label>
                <ErrorMessage
                  name="name"
                  render={(msg) => <div className="invalid-feedback">{t(`yupErrors.${msg}`)}</div>}
                />
              </div>
              <div className="d-flex justify-content-end">
                <Button variant="secondary" className="me-2" onClick={() => dispatch(closeModal())}>{t('modals.channelModal.cancel')}</Button>
                <Button variant="primary" type="submit" disabled={isLoading}>
                  {!isLoading ? t('modals.channelModal.submit') : t('modals.channelModal.sending')}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
