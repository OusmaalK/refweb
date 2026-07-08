import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  // Supprimez le cookie de session (remplacez 'session-token' par le nom de votre cookie)
  (await
        // Supprimez le cookie de session (remplacez 'session-token' par le nom de votre cookie)
        cookies()).delete('session-token'); 
  
  return NextResponse.json({ message: "Déconnexion réussie" });
}