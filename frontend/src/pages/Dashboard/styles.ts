import Modal from 'react-modal';
import styled from 'styled-components';
import colors from '../../styles/colors';

export const Container = styled.div`
  max-width: 627px;
  margin: 0 auto;
  padding: 18px 0;
  height: 100%;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  padding: 16px 8px;
  margin-bottom: 10px;

  table {
    border-spacing: 0;

    thead {
      th {
        text-align: left;
        color: ${colors.gray};
        text-transform: uppercase;
        padding: 8px;
      }
    }

    tbody {
      tr {
        &:nth-child(odd) {
          background-color: ${colors.grayLight};
        }

        td {
          padding: 8px;
        }
      }
    }
  }
`;

export const BoxHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 17px;
`;

export const ModalStyle: Modal.Styles = {
  content: {
    padding: 0,
    width: 500,
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
};
