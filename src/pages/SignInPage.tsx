import { useForm } from "@tanstack/react-form";
import supabase from "../lib/supabase";
import toast from "react-hot-toast";


export default function SignInPage() {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: value.email,
        password: value.password,
      })
      if (error) {
        toast.error(error.message)
        return
      }
      if (data) {
        toast.success('Login success')
      }
    },
  })

  const googleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })
    if (error) {
      toast.error(error.message)
      return
    }
  }

  const githubSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    })
    if (error) {
      toast.error(error.message)
      return
    }
  }

  return (
    <section className="flex flex-wrap items-center justify-center font-poppins">
      <div className="max-w-6xl mx-auto ">
        <div className=" lg:py-7">
          <div className="max-w-xl lg:p-12 shadow-md rounded-md p-6 mx-auto text-center bg-[#dbeafe6e] dark:bg-gray-800 ">
            <h2 className="mb-4 text-3xl font-bold text-gray-700 lg:mb-7 lg:text-5xl dark:text-gray-300">
              Login your account
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-7">
              Your credentials here
            </p>
            <form.Provider>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  void form.handleSubmit();
                }}
              >
                <div className="mb-4 lg:mb-7">
                  <form.Field
                    name="email"
                    children={(field) => (
                      <input
                        type="email"
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-4 py-4 bg-white rounded-lg lg:py-5 dark:text-gray-300 dark:bg-gray-700 "
                      />
                    )}
                  />
                </div>
                <div className="mb-4 lg:mb-7">
                  <div className="relative flex items-center">
                    <form.Field
                      name="password"
                      children={(field) => (
                        <input
                          type="password"
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Enter password"
                          className="w-full px-4 py-4 bg-white rounded-lg lg:py-5 dark:text-gray-300 dark:bg-gray-700 "
                        />
                      )}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      className="absolute right-0 mr-3 dark:text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 16 16">
                      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"></path>
                      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"></path>
                      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"></path>
                    </svg>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4 lg:mb-7">
                  <label htmlFor="" className="flex dark:text-gray-300">
                    <input type="checkbox" className="mt-1 mr-2" />
                    <span className="text-sm ">Remember me</span>
                  </label>
                  <a
                    href=" #"
                    className="text-sm font-semibold text-blue-400 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500">
                    forgot password?
                  </a>
                </div>
                <button
                  className="w-full px-4 py-4 text-sm font-bold text-gray-300 uppercase bg-blue-600 rounded-md lg:text-lg dark:text-gray-300 dark:bg-blue-800 hover:bg-blue-700 dark:hover:bg-blue-900 "
                  type="submit"
                >
                  LOGIN
                </button>
              </form>
            </form.Provider>
            <div className="my-3 lg:my-6">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Or, login with
              </span>
            </div>
            <div className="flex flex-wrap ">
              <div className="w-full py-2 lg:px-2 lg:py-0 lg:w-1/3">
                <button
                  type='button'
                  // onClick={handleFacebook}
                  className="flex items-center justify-center p-3 bg-blue-800 rounded-md hover:bg-blue-600 dark:hover:bg-gray-800">
                  <span className="inline-block mr-2 text-gray-300 dark:text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      fill="currentColor"
                      className="bi bi-facebook"
                      viewBox="0 0 16 16">
                      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"></path>
                    </svg>
                  </span>
                  <span className="text-xs font-medium text-gray-200 uppercase lg:text-sm dark:text-gray-300">
                    Facebook
                  </span>
                </button>
              </div>
              <div className="w-full py-2 lg:px-2 lg:py-0 lg:w-1/3">
                <button
                  type='button'
                  onClick={googleSignIn}
                  className="flex items-center justify-center p-3 bg-red-700 rounded-md dark:bg-red-700 hover:bg-red-500 dark:hover:bg-gray-800">
                  <span className="inline-block mr-2 text-gray-300 dark:text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      fill="currentColor"
                      className="bi bi-google"
                      viewBox="0 0 16 16">
                      <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"></path>
                    </svg>
                  </span>
                  <span className="text-xs font-medium text-gray-200 uppercase lg:text-sm dark:text-gray-300">
                    Google
                  </span>
                </button>
              </div>
              <div className="w-full py-2 lg:px-2 lg:py-0 lg:w-1/3">
                <button
                  type='button'
                  onClick={githubSignIn}
                  className="flex items-center justify-center p-3 bg-gray-800 rounded-md dark:bg-gray-500 hover:bg-gray-700 dark:hover:bg-gray-600">
                  <span className="inline-block mr-2 text-gray-300 dark:text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      fill="currentColor"
                      className="bi bi-apple"
                      viewBox="0 0 16 16">
                      <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282z" />
                      <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282z" />
                    </svg>
                  </span>
                  <span className="text-xs font-medium text-gray-200 uppercase lg:text-sm dark:text-gray-300 ">
                    Github
                  </span>
                </button>
              </div>
            </div>
            <p className="px-2 mt-6 text-sm text-left text-gray-700 dark:text-gray-400">
              If you do not have an account?
              <a
                href="/sign-up"
                className="ml-2 text-base font-semibold text-blue-400 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500">
                Create new account
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
