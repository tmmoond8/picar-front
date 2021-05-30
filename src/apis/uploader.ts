import axios from 'axios';
import env from '../env';

type Presets = 'picar_thumbnail' | 'picar_post' | 'picar_profile';

export default async function (
  file: File | string, preset: Presets
): Promise<{ id: string; imgUrl: string; format: string }> {
  const form = new FormData();
  form.append('file', file);
  form.append('api_key', process.env.REACT_APP_CLOUDINARY_API_KEY || '');
  form.append(
    'upload_preset',
    preset,
  );

  try {
    const { data } = await axios.post(
      process.env.REACT_APP_CLOUDINARY_UPLOAD_URL || '',
      form,
    );

    const imgUrl = env.REACT_APP_STATIC_DOMAIN
      ? data.secure_url.replace('res.cloudinary.com', env.REACT_APP_STATIC_DOMAIN)
      : data.secure_url;

    console.log('imgUrl', imgUrl);

    return {
      id: data.public_id,
      imgUrl,
      format: data.format,
    };
  } catch (error) {
    throw new Error(`UPLOAD ERROR ${error}`);
  }
}
