'use client'

import React from 'react';
import { Button, Flex, Segmented } from 'antd';
import type { FlexProps, SegmentedProps } from 'antd';
import { Col, Row } from 'antd';
import { BookFilled, QuestionCircleFilled } from '@ant-design/icons';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  // backgroundColor: '#4096ff',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#0958d9',
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
  width: '100%'
}

const bigTitleStyle: React.CSSProperties = {
  marginBottom: "10px",
  fontSize: "30px",
  fontWeight: "bold",
  fontFamily: "Helvetica",
}

const titleIconStyle: React.CSSProperties = {
  float: 'left',
  margin: "10px"
}

const colCenterStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

const alignOptions = ['flex-start', 'center', 'flex-end'];

const App: React.FC = () => {
  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <Flex gap="middle" align="center" justify='center' vertical>
          <Row style={rowStyle}>
            <Col span={3} offset={3}>
              <Button style={titleIconStyle} size='large'><QuestionCircleFilled /></Button>
              <Button style={titleIconStyle} size='large'><BookFilled /></Button></Col>
            <Col span={12} style={colCenterStyle}><div style={bigTitleStyle}>Needle v3.0</div></Col>
            <Col span={3}></Col>
          </Row>
        </Flex>
      </Header>
      <Content style={contentStyle}>Content</Content>
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>

  );
};

export default App;