import FetchService from '@services/Fetch.service';
import { useGlobalMessaging } from '@services/GlobalMessaging.context';
import { IRegisterIn } from '../src/types/auth.types';
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { NextPage } from 'next';

const Register: NextPage = () => {
  const [, messageDispatch] = useGlobalMessaging();
  return (
    <main className="min-h-screen h-full bg-gray-100 font-sans leading-normal tracking-normal">
      <section className="max-w-3xl w-full mx-auto">
        <div className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal flex flex-col">
          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
            }}
            onSubmit={(
              values: IRegisterIn,
              { setSubmitting }: FormikHelpers<IRegisterIn>
            ) => {
              console.log('in onsubmit');

              FetchService.isofetch(
                '/api/v1/register',
                {
                  user_name: values.username,
                  email: values.email,
                  password: values.password,
                },
                'POST'
              )
                .then(({ data, status }) => {
                  setSubmitting(false);
                  console.log('res register', data, status);

                  if (status) {
                    messageDispatch({
                      type: 'setMessage',
                      payload: {
                        message: 'You have registered!',
                      },
                    });
                  } else {
                    messageDispatch({
                      type: 'setMessage',
                      payload: {
                        message: data.message,
                      },
                    });
                  }
                })
                .catch();
            }}
            render={({
              handleSubmit,
              isSubmitting,
            }: FormikProps<IRegisterIn>) => (
              <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                <div className="mb-4">
                  <label
                    className="block text-grey-darker text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                    id="email"
                    type="email"
                    name="email"
                    required
                    placeholder="email"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-grey-darker text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                    id="username"
                    type="text"
                    name="username"
                    required
                    placeholder="Username"
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-grey-darker text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <Field
                    className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
                    id="password"
                    type="password"
                    name="password"
                    required
                    placeholder="******************"
                  />
                  <p className="text-red text-xs italic">
                    Please choose a password.
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    disabled={isSubmitting}
                    onClick={() => handleSubmit()}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                    type="button"
                  >
                    Register
                  </button>
                </div>
              </Form>
            )}
          />
        </div>
      </section>
    </main>
  );
};
export default Register;
