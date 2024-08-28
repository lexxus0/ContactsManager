import { useDispatch, useSelector } from "react-redux";
import {
  setEditingContactId,
  clearEditingContactId,
} from "../../redux/contacts/slice";
import { deleteContact } from "../../redux/contacts/operations";
import { selectEditingContactId } from "../../redux/contacts/selectors";
import css from "./Contact.module.css";
import ContactForm from "../ContactForm/ContactForm";
import { MdDeleteOutline, MdOutlineCancel } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const Contact = ({ name, number, id }) => {
  const dispatch = useDispatch();
  const editingContactId = useSelector(selectEditingContactId);

  const isEditing = editingContactId === id;

  const handleEditClick = () => {
    if (isEditing) {
      dispatch(clearEditingContactId());
    } else {
      dispatch(setEditingContactId(id));
    }
  };

  const handleDelete = () => dispatch(deleteContact(id));

  return (
    <li className={css.contactListItem}>
      {isEditing ? (
        <ContactForm
          contact={{ name, number, id }}
          onSubmit={() => dispatch(clearEditingContactId())}
        />
      ) : (
        <>
          <p className={css.contactP}>{name}</p>
          <p className={css.contactP}>{number}</p>
        </>
      )}
      <div className={css.buttonGroup}>
        <button className={css.iconButton} onClick={handleEditClick}>
          {isEditing ? (
            <MdOutlineCancel className={css.icon} />
          ) : (
            <CiEdit className={css.icon} />
          )}
        </button>
        <button className={css.iconButton} onClick={handleDelete}>
          <MdDeleteOutline className={css.icon} />
        </button>
      </div>
    </li>
  );
};

export default Contact;
