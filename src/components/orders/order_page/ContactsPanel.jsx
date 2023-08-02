import ContactsCustomer from "./ContactsCustomer";
import ContactsUser from "./ContactsUser";

const ContactsPanel = (props) => {
  const ctx = props.mediator;

  return (
    <>
      {
        ctx.order.user &&
        <ContactsUser mediator={ ctx } />
      }
      {
        ctx.order.unregCust &&
        <ContactsCustomer mediator={ ctx } />
      }
    </>
  );
}

export default ContactsPanel;