import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { SlPhone, SlUser } from "react-icons/sl";
import { addContact, updateContact } from "../../redux/contacts/contactsOps";
import { useDispatch } from "react-redux";
import css from "./ContactForm.module.css";

const PHONE_REGEX = /^\d{3}-\d{2}-\d{2}$/;

const ContactValidationSchema = Yup.object().shape({
  contactName: Yup.string()
    .required("Required")
    .min(3, "Contact name has to be more than 3 characters")
    .max(50, "Contact name has to be less than 50 characters"),
  contactNumber: Yup.string()
    .required("Required")
    .matches(
      PHONE_REGEX,
      "Invalid phone number format. Please use the format 321-22-11"
    ),
});

const ContactForm = ({ contact = {}, onSubmit }) => {
  const dispatch = useDispatch();
  const isEditing = Boolean(contact.id);

  const initialValues = {
    contactName: contact.name || "",
    contactNumber: contact.number || "",
  };

  const handleSubmit = (values, actions) => {
    const contactData = {
      name: values.contactName,
      number: values.contactNumber,
    };

    if (isEditing) {
      dispatch(
        updateContact({ id: contact.id, updatedData: contactData })
      ).then(() => {
        actions.resetForm();
        if (onSubmit) {
          onSubmit();
        }
      });
    } else {
      dispatch(addContact(contactData)).then(() => {
        actions.resetForm();
        if (onSubmit) {
          onSubmit();
        }
      });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={handleSubmit}
      validationSchema={ContactValidationSchema}
    >
      <Form className={css.contactForm} autoComplete="off">
        <label className={css.contactLabel}>
          <SlUser className={css.formIcon} />
          <span className={css.contactSpanName}>Name</span>
          <Field className={css.contactField} type="text" name="contactName" />
        </label>
        <ErrorMessage
          className={css.contactErr}
          name="contactName"
          component="span"
        />
        <label className={css.contactLabel}>
          <SlPhone className={css.formIcon} />
          <span className={css.contactSpan}>Number</span>
          <Field className={css.contactField} type="tel" name="contactNumber" />
        </label>
        <ErrorMessage
          className={css.contactErr}
          name="contactNumber"
          component="span"
        />
        <button className={css.contactBtn} type="submit">
          {isEditing ? "Update Contact" : "Add Contact"}
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
