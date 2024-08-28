import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import css from "./LoginForm.module.css";

const INIT_VALUES = {
  userEmail: "",
  userPassword: "",
};

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const userValidationSchema = Yup.object().shape({
  userEmail: Yup.string()
    .required("Required")
    .matches(EMAIL_REGEX, "Invalid email format")
    .min(6, "Email has to be more than 6 characters")
    .max(50, "Email has to be less than 50 characters"),
  userPassword: Yup.string().required("Required"),
});

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(
      logIn({
        email: values.userEmail,
        password: values.userPassword,
      })
    )
      .unwrap()
      .then(() => {
        console.log("Login success");
      })
      .catch(() => {
        console.log("Login error");
      });

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
            <button type="sumbit">Log in</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
