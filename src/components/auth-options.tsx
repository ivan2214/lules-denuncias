import React from "react"
import Link from "next/link"

import {Button} from "./ui/button"

const AuthButtons = () => {
  return (
    <section className="flex items-center gap-2">
      <Button role="link" type="button">
        <Link href="/auth/login">Iniciar Sesion</Link>
      </Button>
      <Button role="link" type="button" variant="outline">
        <Link href="/auth/register">Registrarse</Link>
      </Button>
    </section>
  )
}

export default AuthButtons
