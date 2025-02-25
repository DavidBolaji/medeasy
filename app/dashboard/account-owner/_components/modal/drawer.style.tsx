import styled from '@emotion/styled';
import { Drawer } from 'antd';

export const StyledMobileDrawer = styled(Drawer)`
  padding: 0 !important;
  border-radius: 20px !important;
  .ant-drawer-body {
    padding: 0 !important;
    overflow-y: hidden !important;
  }
  .ant-drawer-footer {
    padding: 0 !important;
  }
`;
