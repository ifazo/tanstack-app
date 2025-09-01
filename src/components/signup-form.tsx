import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useForm } from '@tanstack/react-form'
import {
  useSignUp,
  useSignInWithGithub,
  useSignInWithGoogle,
} from '@/lib/mutations'
import { useToast } from '@/hooks/useToast'
import { useRef } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const navigate = useNavigate()
  const signUp = useSignUp()
  const signInWithGoogle = useSignInWithGoogle()
  const signInWithGithub = useSignInWithGithub()

  const { showSuccess, showError } = useToast()
  const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY as string
  const fileInputRef = useRef<HTMLInputElement>(null)

  const uploadToImgbb = async (file: File) => {
    if (!IMGBB_API_KEY) throw new Error('ImgBB API key not found')

    try {
      const formData = new FormData()
      formData.append('image', file)

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        { method: 'POST', body: formData },
      )
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error?.message || 'Upload failed')
      return data.data.display_url as string
    } catch (err: any) {
      console.error('❌ Image upload failed:', err)
      throw err
    }
  }

  const form = useForm({
    defaultValues: {
      name: '',
      image: null as File | null,
      email: '',
      password: '',
    },
    // validators: {
    //   onChange: z.object({
    //     name: z.string().min(4, 'Name must be at least 4 characters'),
    //     image: z.instanceof(File, 'Image is required'),
    //     email: z.string().email('Invalid email'),
    //     password: z.string().min(6, 'Password must be at least 6 characters'),
    //   }),
    // },
    onSubmit: async ({ value }) => {
      // showLoading('Loading...', 'Please wait while processing.')
      try {
        let imageUrl = ''
        if (value.image) {
          imageUrl = await uploadToImgbb(value.image)
        }
        const submitValue = { ...value, image: imageUrl }
        console.log(submitValue)
        signUp.mutate(submitValue, {
          onSuccess: (res) => {
            console.log('✅ Signed up:', res)
            showSuccess('Sign up successful!', 'Congratulations!')
            navigate({ to: '/' })
          },
          onError: (err) => {
            console.error('❌ Sign up failed:', err)
            showError(
              'Sign up failed',
              `Error: ${err.message || 'Unknown error'}`,
            )
          },
        })
      } catch (uploadError: any) {
        showError('Image upload failed', uploadError.message)
      }
    },
  })

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            className="p-6 md:p-8"
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Sign up</h1>
                <p className="text-muted-foreground text-balance">
                  Create your account
                </p>
              </div>
              <div className="grid gap-3">
                <form.Field
                  name="image"
                  children={(field) => (
                    <>
                      <div className="flex flex-col items-center gap-3">
                        <div className="relative w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                          {field.state.value ? (
                            <img
                              src={URL.createObjectURL(field.state.value)}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-gray-400 text-sm text-center">
                              No Image
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            Upload
                          </Button>
                          {field.state.value && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => field.handleChange(null)}
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null
                            field.handleChange(file)
                          }}
                          className="hidden"
                        />
                      </div>
                      {field.state.meta.errors.length > 0 && (
                        <p className="text-red-500 text-sm">
                          {field.state.meta.errors[0]}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <form.Field
                  name="name"
                  children={(field) => (
                    <>
                      <Input
                        type="text"
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Your Name"
                        required
                      />
                      {field.state.meta.errors.length > 0 && (
                        <p className="text-red-500 text-sm">
                          {field.state.meta.errors[0]}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <form.Field
                  name="email"
                  children={(field) => (
                    <>
                      <Input
                        type="email"
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="user@mail.com"
                        required
                      />
                      {field.state.meta.errors.length > 0 && (
                        <p className="text-red-500 text-sm">
                          {field.state.meta.errors[0]}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <form.Field
                  name="password"
                  children={(field) => (
                    <>
                      <Input
                        type="password"
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="123456"
                        required
                      />
                      {field.state.meta.errors.length > 0 && (
                        <p className="text-red-500 text-sm">
                          {field.state.meta.errors[0]}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={signUp.isPending}
              >
                {signUp.isPending ? 'Loading...' : 'Sign up'}
              </Button>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  type="button"
                  className="w-full"
                  onClick={() =>
                    signInWithGithub.mutate(undefined, {
                      onSuccess: () => {
                        showSuccess('Logged in with Github!', 'Successful')
                        navigate({ to: '/' })
                      },
                      onError: (err) =>
                        showError(
                          'Github login failed',
                          `Error: ${err.message || 'Unknown error'}`,
                        ),
                    })
                  }
                >
                  <svg viewBox="0 0 438.549 438.549">
                    <path
                      fill="currentColor"
                      d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
                    ></path>
                  </svg>
                  <span className="sr-only">Login with Github</span>
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  className="w-full"
                  onClick={() =>
                    signInWithGoogle.mutate(undefined, {
                      onSuccess: () => {
                        showSuccess('Logged in with Google!', 'Successful')
                        navigate({ to: '/' })
                      },
                      onError: (err) =>
                        showError(
                          'Google login failed',
                          `Error: ${err.message || 'Unknown error'}`,
                        ),
                    })
                  }
                >
                  <svg role="img" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    />
                  </svg>
                  <span className="sr-only">Login with Google</span>
                </Button>
                <Button variant="outline" type="button" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Login with Meta</span>
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{' '}
                <Link to="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </div>
          </form>

          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{' '}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
