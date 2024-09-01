// .letter-box {
//     border: 2px solid gray;
//     border-radius: 3px;
//     margin: 2px;
//     height: 3rem;
//     width: 3rem;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     position: relative;
//     min-width: 3rem;
//   }

const SpotBoxCss: React.CSSProperties = {
    border: '2px solid gray',
    borderRadius: '3px',
    margin: '2px',
    height: '3rem',
    width: '3rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    minWidth: '3rem',
};

const SpotBox: React.FC = () => {
    return <div style={SpotBoxCss}></div>;
};
export { SpotBoxCss, SpotBox };
