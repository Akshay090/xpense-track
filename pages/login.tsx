import FetchService from '@services/Fetch.service';
import { useGlobalMessaging } from '@services/GlobalMessaging.context';
import { ILoginIn } from '../src/types/auth.types';
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import TokenService from '@services/Token.service';

const Login: NextPage = () => {
  const router = useRouter();
  const [, messageDispatch] = useGlobalMessaging();
  // const [authState, authDispatch] = useAuth();
  return (
    <main className="min-h-screen h-full bg-gray-100 font-sans leading-normal tracking-normal">
      <section className="max-w-3xl w-full mx-auto">
        <div className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal flex flex-col">
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={(
              values: ILoginIn,
              { setSubmitting }: FormikHelpers<ILoginIn>
            ) => {
              console.log('in onsubmit login');

              FetchService.isofetch(
                '/api/v1/login',
                {
                  email: values.email,
                  password: values.password,
                },
                'POST'
              )
                .then(({ data, status }) => {
                  setSubmitting(false);
                  console.log('login resp', data);

                  if (status) {
                    console.log('here in');

                    // save token in cookie for subsequent requests
                    const tokenService = new TokenService();
                    tokenService.saveToken(data.token as string);

                    // Current api not return email or username
                    // Snippet for future use
                    // authDispatch({
                    //   type: 'setAuthDetails',
                    //   payload: {
                    //     email: res.email,
                    //   },
                    // });
                    router.push('/app');
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
            render={({ handleSubmit, isSubmitting }: FormikProps<ILoginIn>) => (
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
                    Login
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
export default Login;
