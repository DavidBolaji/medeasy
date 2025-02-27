import { Menu } from "antd";
import styled from '@emotion/styled'

export const MenuStyled = styled(Menu)`
  && {
    background-color: #F1F5F7;
  
    .ant-menu-title-content {
      color: #23342A;
      margin-left: 16px !important;
      font-weight: 400; 
       width: 92% !important;
    }
    .ant-menu-item-icon {
      color: #000;
    }
    .ant-menu-item.ant-menu-item-selected {
      background-color: #517df0;
      width: 92%;
      border-radius: 0px 50px 50px 0px;
    }

    .ant-menu-item.ant-menu-item-selected > * {
      color: #fff !important;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;

    }
    .ant-menu-item.ant-menu-item-selected > .ant-menu-item-icon {
      color: #066932;
    }
    .ant-menu-item.ant-menu-item-active {
      background-color: #517df0 !important;
      width: 92% !important;
      border-radius: 0px 50px 50px 0px !important;
    }
    .ant-menu-item.ant-menu-item-active > * {
      color: #fff !important;
    }
    > * {
      padding-left: 36px !important;
      margin: 0px;
      height: 48px;
      width: 92%;
      border-radius: 0px 50px 50px 0px;
      margin-bottom: 6px;
    }
  }
`