import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import css from "./RegisterForm.module.css";

const INIT_VALUES = {
  userName: "",
  userEmail: "",
  userPassword: "",
};

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const userValidationSchema = Yup.object().shape({
  userName: Yup.string()
    .required("Required")
    .min(3, "Username has to be more than 3 characters")
    .max(30, "Username has to be less than 30 characters"),
  userEmail: Yup.string()
    .required("Required")
    .matches(EMAIL_REGEX, "Invalid email format")
    .min(6, "Email has to be more than 6 characters")
    .max(50, "Email has to be less than 50 characters"),
  userPassword: Yup.string().required("Required"),
});

const RegisterForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    const formattedValues = {
      name: values.userName,
      email: values.userEmail,
      password: values.userPassword,
    };

    dispatch(register(formattedValues));

    resetForm();
  };

  return (
    <div className={css.formContainer}>
      <div className={css.formWrapper}>
        <Formik
          initialValues={INIT_VALUES}
          onSubmit={handleSubmit}
          validationSchema={userValidationSchema}
        >
          <Form>
            <h2>Register</h2>
            <label>
              <span>Name</span>
              <Field type="text" name="userName" />
            </label>
            <ErrorMessage
              name="userName"
              component="span"
              className={css.error}
            />
            <label>
              <span>Email</span>
              <Field type="email" name="userEmail" />
            </label>
            <ErrorMessage
              name="userEmail"
              component="span"
              className={css.error}
            />
            <label>
              <span>Password</span>
              <Field type="password" name="userPassword" />
            </label>
            <ErrorMessage
              name="userPassword"
              component="span"
              className={css.error}
            />
            <button type="submit">Register</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
