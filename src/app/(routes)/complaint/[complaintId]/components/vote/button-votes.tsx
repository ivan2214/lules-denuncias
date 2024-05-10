"use client";

import {useTransition} from "react";
import {toast} from "sonner";
import {ChevronUpIcon} from "lucide-react";

import {Button} from "@/components/ui/button";
import {type ComplaintExtends} from "@/actions/complaints/get-filtered-complaints";
import {voteAction} from "@/actions/server-actions/vote/vote-action";
import {Badge} from "@/components/ui/badge";

interface ButtonVotesProps {
  complaint: ComplaintExtends;
}

export const ButtonVotes: React.FC<ButtonVotesProps> = ({complaint}) => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      voteAction(complaint.id, 6).then((res) => {
        if (res?.error) {
          toast("Error", {
            description: res?.error,
          });
        }

        if (res?.success) {
          toast("Voto registrado", {
            description: res?.success,
          });
        }
      });
    });
  };

  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-center gap-x-3">
        <h2 className="text-2xl font-bold">Vota</h2>
        <Badge>Votos: {complaint.votes.length}</Badge>
      </div>
      <div className="flex items-center gap-x-4">
        <p className="text-base font-extralight">Podes votar para que la prioridad aumente</p>
        <Button disabled={isPending} size="icon" variant="default" onClick={onClick}>
          <ChevronUpIcon />
        </Button>
      </div>
    </section>
  );
};
