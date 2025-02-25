import { Menu } from 'antd';
import styled from '@emotion/styled';

export const MenuStyled = styled(Menu)`
  && {
    background-color: #fff;
    font-family: 'Instrument-Variable';

    .ant-menu-title-content {
      color: #23342a;
      margin-left: 14px !important;
      font-weight: 400;
    }
    .ant-menu-item-icon {
      color: #000;
    }
    .ant-menu-item.ant-menu-item-selected {
      background-color: #e4e4ef;
      border-radius: 0px;
      border-right: 4px solid #517df0;
    }

    .ant-menu-item.ant-menu-item-selected > * {
      color: #141923 !important;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
    }
    .ant-menu-item.ant-menu-item-selected > .ant-menu-item-icon {
      color: #141923;
    }
    .ant-menu-item.ant-menu-item-active {
      background-color: #e4e4ef !important;
      border-radius: 0px;
    }
    .ant-menu-item.ant-menu-item-active > * {
      color: #141923 !important;
    }
    > * {
      padding-left: 28px !important;
      margin: 0px;
      height: 56px;
      width: 100%;
    }
  }
`;
