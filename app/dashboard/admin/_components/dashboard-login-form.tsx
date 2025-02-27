"use client"

import FormikInput from "@/app/_components/input/formik-input"
import { Button } from "@/app/_components/ui/button"
import { Images } from "@/app/_constants/images"
import { useNotification } from "@/app/_hooks/use-notification"
import { signInSchema, signInSchemaType } from "@/src/entities/models/auth/login-schema"
import { Form, Formik } from "formik"
import { Loader2 } from "lucide-react"
import Image from "next/image"
import { toFormikValidationSchema } from "zod-formik-adapter"
import { signInAdmin } from "../action"

const DashboardLoginForm = () => {
    const { toggleNotification } = useNotification();

    const onSubmit = async (values: signInSchemaType) => {
        const response = await signInAdmin(values);
        if (!response) {
            return toggleNotification({
                show: true,
                title: 'Login successfull',
                type: 'success',
                message: 'User has been succesfully logged in',
            });
        }

        if (!response?.success) {
            toggleNotification({
                show: true,
                title: 'Login Failed',
                type: 'error',
                message: response.error,
            });
        }
    };

    return <Formik
        initialValues={{
            email: '',
            password: '',
        }}
        validationSchema={toFormikValidationSchema(signInSchema)}
        validateOnMount
        onSubmit={onSubmit}
    >
        {({ handleSubmit, isSubmitting, isValid }) => (
            <Form onSubmit={handleSubmit} className="space-y-6 w-full md:w-[600px] bg-white p-12 rounded-2xl">
                <div className="flex gap-x-2 items-center justify-center h-full mb-6">
                    <Image
                        alt="logo"
                        src={Images.ICON}
                        width={120}
                        height={40}
                        priority
                    />
                    <div className="mt-4">|</div>
                    <div className="mt-4">Admin Portal</div>
                </div>
                <FormikInput label="Email" name="email" type="email" />
                <FormikInput label="Password" name="password" type="password" />
                <div className="" />
                <Button
                    disabled={isSubmitting || !isValid}
                    variant={'secondary'}
                    className="w-full flex justify-center"
                >
                    {isSubmitting ? (
                        <Loader2 className="h-8 w-8 animate-spin text-white" />
                    ) : (
                        'Sign In'
                    )}
                </Button>
            </Form>
        )}
    </Formik>
}

export default DashboardLoginForm;