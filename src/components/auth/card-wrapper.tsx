import {Card, CardContent, CardFooter, CardHeader} from "@ui/card"
import {Header} from "@/components/auth/header"
import {Social} from "@/components/auth/social"
import {BackButton} from "@/components/auth/back-button"

interface CardWrapperProps {
  children: React.ReactNode
  hederLabel: string
  backButtonLabel: string
  backButtonHref: string
  showSocial?: boolean
}

export default function CardWrapper({
  children,
  hederLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={hederLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial ? (
        <CardFooter>
          <Social />
        </CardFooter>
      ) : null}
      <CardFooter>
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  )
}
