import React from 'react';

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    // backgroundColor: '#fff',
};

const contentStyle: React.CSSProperties = {
    // textAlign: 'center',
    // minHeight: 120,
    // lineHeight: '120px',
};

const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#1677ff',
};

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#4096ff',
};

const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    width: 'calc(100% - 8px)',
};

const rowStyle: React.CSSProperties = {
    width: '100%',
};

const bigTitleStyle: React.CSSProperties = {
    marginBottom: '10px',
    fontSize: '30px',
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
};

const titleIconStyle: React.CSSProperties = {
    float: 'left',
    margin: '10px',
};

const successButtonStyle: React.CSSProperties = {
    color: '#ffffff',
    backgroundColor: '#52c41a',
};

const colCenterStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const gameModeStyle: React.CSSProperties = {
    // position: "absolute",
    // top: 0,
    // left: 0,
    width: '100%',
    height: '100%',
    zIndex: 5,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    fontFamily: 'Consolas',
    fontSize: '450%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'default',
};

const sideTitleStyle: React.CSSProperties = {
    fontSize: '20px',
    padding: '20px 0',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
};

const midColStyle: React.CSSProperties = {
    borderLeft: 'rgba(128, 128, 128, 0.25) 1px solid',
    borderRight: 'rgba(128, 128, 128, 0.25) 1px solid',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

const midtopColStyle: React.CSSProperties = {
    borderLeft: 'rgba(128, 128, 128, 0.25) 1px solid',
    borderRight: 'rgba(128, 128, 128, 0.25) 1px solid',
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    paddingTop: '30px',
    alignItems: 'center',
};

const sideColStyle: React.CSSProperties = {
    // display: flex;
    // flex-direction: column;
    display: 'flex',
    flexDirection: 'column',
};
const BangCursorStyle: React.CSSProperties = {
    cursor: 'url("/target.png"), auto',
};

const AwardItemStyle: React.CSSProperties = {};
const ModalContentStyle: React.CSSProperties = {
    maxHeight: '90%',
    overflow: 'hidden',
    padding: '16px',
    boxSizing: 'border-box',
    zIndex: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};
const ModalAwardStyle: React.CSSProperties = {
    width: '100%',
    display: 'block',
};
const ModalTagStyle: React.CSSProperties = {
    cursor: 'default',
    margin: '5px 8px',
    border: 'none',
    display: 'inline-block',
    height: '32px',
    padding: '0 10px',
    lineHeight: '30px',
    fontSize: '12px',
    borderRadius: '4px',
    boxSizing: 'border-box',
    whiteSpace: 'nowrap',
};
const ModalTagUncompletedStyle: React.CSSProperties = {
    opacity: 0.3,
};
const ModalTitleStyle: React.CSSProperties = {
    fontWeight: 'bold',
    fontSize: '30px',
    margin: '20px 0',
};
export {
    AwardItemStyle,
    BangCursorStyle,
    ModalAwardStyle,
    ModalContentStyle,
    ModalTagStyle,
    ModalTagUncompletedStyle,
    ModalTitleStyle,
    bigTitleStyle,
    colCenterStyle,
    contentStyle,
    footerStyle,
    gameModeStyle,
    headerStyle,
    layoutStyle,
    midColStyle,
    midtopColStyle,
    rowStyle,
    sideColStyle,
    sideTitleStyle,
    siderStyle,
    successButtonStyle,
    titleIconStyle,
};
