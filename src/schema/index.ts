import * as Yup from 'yup';

const profile = (
  currentName: string,
  currentEmail: string,
): Yup.ObjectSchema<{
  name: string;
  email: string;
  image?: string;
}> =>
  Yup.object({
    name: Yup.string()
      .required('Name is required')
      .test('is-unchanged', 'Name is the same as before', function (value) {
        return value !== currentName;
      }),
    email: Yup.string()
      .email('Invalid Email Address')
      .required('Email is required')
      .test('is-unchanged', 'Email is the same as before', function (value) {
        return value !== currentEmail;
      }),
    image: Yup.string()
      .test('is-base64', 'Invalid base64 image', (value) => {
        if (!value) return true; // not required
        const base64Regex = /^data:image\/(jpeg|png|jpg|gif);base64,/;
        return base64Regex.test(value);
      })
      .test('size', 'File must be less than 2MB', (value) => {
        if (!value) return true; // not required
        const base64String = value.split(',')[1]; // Get the actual base64 string without the prefix
        const sizeInBytes =
          base64String.length * (3 / 4) -
          (base64String.endsWith('==')
            ? 2
            : base64String.endsWith('=')
              ? 1
              : 0);
        return sizeInBytes <= 2 * 1024 * 1024; // 2MB limit
      }),
  });

const password = Yup.object({
  currentPassword: Yup.string()
    .min(8, 'Current Password must be at least 8 characters')
    .required('Current Password is required'),
  newPassword: Yup.string()
    .min(8, 'New Password must be at least 8 characters')
    .required('New Password is required'),
  newPasswordConfirm: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm New Password is required'),
});

export default { profile, password };
