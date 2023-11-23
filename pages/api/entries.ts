import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }

    const {name, username, video, thumbnail, gender, duration, description  } = req.body;

    const user = await prismadb.movie.create({
        data: {
            description,
            title: name,
            videoUrl: video,
            thumbnailUrl: thumbnail,
            genre: gender,
            duration,
            username
        } as any
    })

    return res.status(200).json(user);
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }
}