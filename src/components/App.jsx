import { nanoid } from "nanoid";
import {Component} from "react"

import { Section } from "./Section/Section";
import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";

export class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  }

  addContact = ({name, number}) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const findContact = this.state.contacts.find(contact =>
      contact.name.toLowerCase().includes(name.toLowerCase())
    );

    findContact
      ? alert(`${name} is already in contact`)
      : this.setState(({ contacts }) => ({
          contacts: [contact, ...contacts],
        }));
  };

deleteContactItem = id => {
  this.setState(prev => ({
    contacts: prev.contacts.filter(contact => contact.id !== id),
  }));
};

changeContact = event => {
  this.setState({filter : event.currentTarget.value})
}

/* chekContact = () => {
  const {contacts,filter} = this.state
  return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
} */

render() {
  const { filter,contacts} = this.state;
  const normalizeFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizeFilter)
  );

  return (
    <>
    <Section title="Phonebook">
    <ContactForm onSubmit={this.addContact} />
     <Filter value={filter} 
      changeContact={this.changeContact} 
      /> 
       </Section>
      <Section title = "Contacts">
      <ContactList contacts = {visibleContacts} 
      onDeleteContact = {this.deleteContactItem}
      /> 
      </Section>
    </>
  )
}
};
