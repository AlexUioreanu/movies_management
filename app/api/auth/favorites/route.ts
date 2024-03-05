import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { Result } from "@/types";
import { useSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";

const handleError = (error: any, message: string) => {
  console.error(message, error);
  return NextResponse.json({ message }, { status: 500 });
};

export async function PUT(req: Request, res: NextApiResponse) {
  const { movieId, moviePosterPath, movieVoteAverage } = await req.json();

  try {
    const updateResponse = await sql`
      UPDATE users
      SET favoriteMovies = array_append(favoriteMovies, ${movieId})
      WHERE email = ${"alex.uio@gmail.com"};
    `;

    const updateResponse2 = await sql`
        INSERT INTO movie 
        VALUES (${movieId}, ${movieVoteAverage}, ${moviePosterPath});
      `;

    if (updateResponse.rowCount > 0) {
      return NextResponse.json({ message: "Favorite added successfully" });
    } else {
      return NextResponse.json(
        { message: "Favorite update failed" },
        { status: 400 }
      );
    }
  } catch (error) {
    return handleError(error, "Error updating favorite");
  }
}

export async function DELETE(request: Request) {
  // const session = await getServerSession(request);
  const { movieId } = await request.json();
  console.log(movieId);

  try {
    const updateResponse = await sql`
      UPDATE users
      SET favoriteMovies = array_remove(favoriteMovies, ${movieId})
      WHERE email = ${"alex.uio@gmail.com"};
    `;

    if (updateResponse.rowCount > 0) {
      return NextResponse.json({ message: "Favorite removed successfully" });
    } else {
      return NextResponse.json(
        { message: "Favorite not found or failed to remove" },
        { status: 404 }
      );
    }
  } catch (error) {
    return handleError(error, "Error removing favorite");
  }
}

export async function GET() {
  // const session = await getServerSession(request);
  // const { movieId } = await request.json();
  // console.log(movieId);

  try {
    const updateResponse = await sql`
      SELECT favoriteMovies from users
      WHERE email = ${"alex.uio@gmail.com"};
    `;
  } catch (error) {
    return handleError(error, "Error getting favorite movies list");
  }
}
