import styled from '@emotion/styled';
import { Drawer } from 'antd';

export const StyledDashboardNotificationDrawer = styled(Drawer)`
  padding: 0 !important;
  .ant-drawer-body {
    padding: 0 !important;
    overflow-y: auto !important;
    /* IE and Edge */
    -ms-overflow-style: none;
    /* Firefox */
    scrollbar-width: none;

    &::-webkit-scrollbar {
      /* Chrome, Safari and Opera */
      display: none;
    }
  }
`;

export const StyledMobileDrawer = styled(Drawer)`
  padding: 0 !important;
  border-radius: 20px !important;
  .ant-drawer-body {
    padding: 0 !important;
    overflow-y: auto !important;
    /* IE and Edge */
    -ms-overflow-style: none;
    /* Firefox */
    scrollbar-width: none;

    &::-webkit-scrollbar {
      /* Chrome, Safari and Opera */
      display: none;
    }
  }
`;
