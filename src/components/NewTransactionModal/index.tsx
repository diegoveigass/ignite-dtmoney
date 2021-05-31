import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import { useTransactions } from '../../hooks/useTransactions';

import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';

import { Container, TransctionTypeContainer, RadioBox } from './styles';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState(0);
  const [type, setType] = useState<'deposit' | 'withdraw'>('deposit');
  const [category, setCategory] = useState('');

  const { createTransaction } = useTransactions();

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      title,
      value,
      category,
      type,
    });

    setTitle('');
    setValue(0);
    setCategory('');
    setType('deposit');
    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="react-modal-content"
      overlayClassName="react-modal-overlay"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input
          placeholder="Título"
          value={title}
          onChange={event => {
            setTitle(event.target.value);
          }}
        />

        <input
          type="number"
          placeholder="Valor"
          value={value}
          onChange={event => {
            setValue(Number(event.target.value));
          }}
        />

        <TransctionTypeContainer>
          <RadioBox
            type="button"
            isActive={type === 'deposit'}
            activeColor="green"
            onClick={() => {
              setType('deposit');
            }}
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            isActive={type === 'withdraw'}
            activeColor="red"
            onClick={() => {
              setType('withdraw');
            }}
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransctionTypeContainer>

        <input
          placeholder="Categoria"
          value={category}
          onChange={event => {
            setCategory(event.target.value);
          }}
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
