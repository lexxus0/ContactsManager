import Contact from "../Contact/Contact";
import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/contacts/selectors";

const ContactList = ({}) => {
  const contacts = useSelector(selectFilteredContacts);

  return (
    <div>
      {contacts.map((contactItem) => {
        return (
          <Contact
            name={contactItem.name}
            number={contactItem.number}
            key={contactItem.id}
            id={contactItem.id}
          />
        );
      })}
    </div>
  );
};

export default ContactList;
