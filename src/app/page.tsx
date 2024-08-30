'use client'

import { BookFilled, QuestionCircleFilled } from '@ant-design/icons';
import { Button, Col, ConfigProvider, Divider, Flex, Layout, Row } from 'antd';
import React from 'react';
import * as styled from './style';
const { Header, Footer, Sider, Content } = Layout;

const alignOptions = ['flex-start', 'center', 'flex-end'];


const App: React.FC = () => {

  const [chances, setChances] = React.useState(16);

  return (
    <ConfigProvider theme={{
      components: {
        Layout: {
          bodyBg: 'white',
          headerBg: 'white',
          headerColor: 'black'
        },
      },
      token: {
        lineWidth: 2,
        marginLG: 8,
      },
    }}>
      <Layout style={styled.layoutStyle}>
        <Header style={styled.headerStyle}>
          <Flex gap="middle" align="center" justify='center' vertical>
            <Row style={styled.rowStyle}>
              <Col span={3} offset={3}>
                <Button style={styled.titleIconStyle} size='large'><QuestionCircleFilled /></Button>
                <Button style={styled.titleIconStyle} size='large'><BookFilled /></Button></Col>
              <Col span={12} style={styled.colCenterStyle}><div style={styled.bigTitleStyle}>Needle v3.0</div></Col>
              <Col span={3}></Col>
            </Row>
          </Flex>
        </Header>

        <Content style={styled.contentStyle}>
          <Divider />
          <div style={styled.gameModeStyle} >{chances}</div>
          <Divider />
          <Row>
            <Col span={6} >
              <b style={styled.sideTitleStyle}>说明</b>
              <div id="description-board"></div>
            </Col>
            <Col span={12} style={styled.midColStyle}>
              <div id="game-board"></div>
              <div id="chances-board"></div>
            </Col>
            <Col span={6} >
            <b style={styled.sideTitleStyle}>笔记</b>
            <div id="notes-board"></div>
            </Col>
          </Row>

        </Content>

      </Layout>
    </ConfigProvider>


  );
};

export default App;