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

const sideColStyle: React.CSSProperties = {
    // display: flex;
    // flex-direction: column;
    display: 'flex',
    flexDirection: 'column',
};

export {
    bigTitleStyle,
    colCenterStyle,
    contentStyle,
    footerStyle,
    gameModeStyle,
    headerStyle,
    layoutStyle,
    midColStyle,
    rowStyle,
    sideColStyle,
    sideTitleStyle,
    siderStyle,
    titleIconStyle,
};
