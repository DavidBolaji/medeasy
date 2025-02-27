"use client";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const usePath = () => {
  const pathname = usePathname();
  const params = useParams();
  const customerId = params?.customerId;
  const orderId = params?.orderId;
  const productId = params?.productId;
  const promotionId = params?.promotionId;
  const blogId = params?.blogId;
  const faqId = params?.faqId;
  const [locationCurrent, setLoc] = useState("");

  useEffect(() => {
    const key =
      pathname === "/dashboard/admin/home"
        ? "/dashboard/admin/home"
        : pathname === "/dashboard/admin/user-management"
        ? "/dashboard/admin/user-management"
        : pathname === "/dashboard/admin/user-management/add"
        ? "/dashboard/admin/user-management"
        : pathname === `/dashboard/admin/user-management/edit/${productId}`
        ? "/dashboard/admin/user-management"
        : pathname === "/dashboard/admin/help-requests"
        ? "/dashboard/admin/help-requests"
        : pathname === "/dashboard/admin/payment"
        ? "/dashboard/admin/payment"
        : pathname === "/dashboard/admin/payment/add"
        ? "/dashboard/admin/payment"
        : pathname === `/dashboard/admin/help-requests/${customerId}`
        ? "/dashboard/admin/help-requests"
        : pathname === `/dashboard/admin/help-requests/${customerId}/edit`
        ? "/dashboard/admin/help-requests"
        : pathname === `/dashboard/admin/communication`
        ? "/dashboard/admin/communication"
         : pathname === `/dashboard/admin/payment/${orderId}`
        ? "/dashboard/admin/payment"
         : pathname === `/dashboard/admin/communication/add`
        ? "/dashboard/admin/communication"
         : pathname === `/dashboard/admin/communication/${promotionId}`
        ? "/dashboard/admin/communication"
         : pathname === `/dashboard/admin/communication/${promotionId}/edit`
        ? "/dashboard/admin/communication"
         : pathname === `/dashboard/admin/settings`
        ? "/dashboard/admin/settings"
         : pathname === "/dashboard/admin/settings/add"
        ? "/dashboard/admin/settings"
         : pathname === `/dashboard/admin/settings/${blogId}/edit`
        ? "/dashboard/admin/settings"
         : pathname === `/dashboard/admin/settings/faq/${faqId}/edit`
        ? "/dashboard/admin/settings"
         : pathname === `/dashboard/admin/settings/faq/add`
        ? "/dashboard/admin/settings"
        : pathname?.split("/")[pathname?.split("/").length - 1];
    setLoc(key);
  }, [pathname, customerId, orderId, promotionId, blogId, faqId]);

  return { locationCurrent };
};

export default usePath;
