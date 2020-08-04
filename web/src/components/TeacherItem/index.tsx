import React from 'react';

import whatsAppIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css';

const TeacherItem: React.FC = () => {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://avatars0.githubusercontent.com/u/52966246?s=460&u=099dcf52d23e30cbedfb3781de444aa55c2738ca&v=4" alt="daniel" />
        <div>
          <strong>Daniel Ribeiro</strong>
          <span>Química</span>
        </div>
      </header>

      <p>
        Entusiasta das melhores tecnologias de química avançada.
      <br /> <br />
      Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.
    </p>

      <footer>
        <p>
          Preço/hora
        <strong>R$ 80,00</strong>
        </p>

        <button type="button">
          <img src={whatsAppIcon} alt="whatsapp" />
        Entrar em contato
      </button>
      </footer>
    </article>);
}

export default TeacherItem;