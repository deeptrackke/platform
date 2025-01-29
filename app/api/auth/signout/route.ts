import { authFetch } from "@/lib/authFetch";
import { deleteSession, getSession } from "@/lib/session";

export async function POST() {
  try {
    const session = await getSession();
    
    if (!session?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { 
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Call external signout endpoint
    const response = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: session.user.id }),
    });

    if (!response.ok) {
      throw new Error("External signout failed");
    }

    // Clear server session
    await deleteSession();

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
    
  } catch (error) {
    console.error("Signout error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}