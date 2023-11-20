import React, { useState, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { channelsSelectors } from '../../slices/channels';
import { Modal } from 'react-bootstrap';
import SocketContext from '../../contexts/socketContext';


const AddChannelModal = ({ show, close }) => {
  const [isLoading, setLoading] = useState(false);
  const { addChannel } = useContext(SocketContext);
  const channelNames = useSelector(channelsSelectors.selectAll).map((channel) => channel.name);
  const { t } = useTranslation();

  const addChannelSchema = Yup.object({
    name: Yup.string().test(
      'name is duplicated',
      `${t('yupErrors.channelNameIsDuplicated')}`,
      (value) => !channelNames.includes(value),
    ),
  });

  return (
    <Modal show={show} onHide={close} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.addChannelModal.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: ''}}
          validationSchema={addChannelSchema}
          onSubmit={({ name }) => {
            setLoading(true);
            try {
              addChannel({ name });
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
                  name="name"
                  id="name"
                  required
                  autoFocus
                  className={`mb-2 form-control ${
                    touched.name && errors.name ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="invalid-feedback"
                />
                <label className="visually-hidden" htmlFor="name">{t('modals.addChannelModal.channelName')}</label>
              </div>
              <div className="d-flex justify-content-end">
                <button type="button" className="me-2 btn btn-secondary" onClick={close}>{t('modals.addChannelModal.cancel')}</button>
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                  {!isLoading ? t('modals.addChannelModal.submit') : t('modals.addChannelModal.creating')}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
