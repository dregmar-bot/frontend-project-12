import React, { useState, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { channelsSelectors } from '../../slices/channels';
import { Modal } from 'react-bootstrap';
import SocketContext from '../../contexts/socketContext';


const RenameChannelModal = ({ show, close,  id}) => {
  const [isLoading, setLoading] = useState(false);
  const { renameChannel } = useContext(SocketContext);
  const channelNames = useSelector(channelsSelectors.selectAll).map((channel) => channel.name);
  const { t } = useTranslation();

  const channelNameSchema = Yup.object({
    name: Yup.string().test(
      'name is duplicated',
      `${t('yupErrors.channelNameIsDuplicated')}`,
      (value) => !channelNames.includes(value),
    ),
  });

  return (
    <Modal show={show} onHide={close} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t(`modals.channelModal.rename`)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: ''}}
          validationSchema={channelNameSchema}
          onSubmit={({ name }) => {
            setLoading(true);
            try {
              renameChannel(id, name);
              setLoading(false);
              close();
            } catch (e) {
              console.log(e);
            }
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div>
                <Field
                  type="name"
                  name="new-name"
                  id="new-name"
                  required
                  autoFocus
                  className={`mb-2 form-control ${
                    touched.newName && errors.newName ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="new-name"
                  component="div"
                  className="invalid-feedback"
                />
                <label className="visually-hidden" htmlFor="new-name">{t('modals.channelModal.channelName')}</label>
              </div>
              <div className="d-flex justify-content-end">
                <button type="button" className="me-2 btn btn-secondary" onClick={close}>{t('modals.channelModal.cancel')}</button>
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                  {!isLoading ? t('modals.channelModal.submit') : t('modals.channelModal.creating')}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
