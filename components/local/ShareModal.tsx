"use client"

import { useEffect, useState } from "react";
import { MdCheck, MdClose, MdContentCopy, MdOutlineLanguage, MdShare } from "react-icons/md";
import Modal from "./Modal";
import { Button } from "../design-system/Button";
import { Input } from "../design-system/Input";
import { Avatar } from "../design-system/Avatar";
import { baseStyle } from "@/constants/styles";
import { collaboratorRoleOptions } from "@/constants/export";
import { Collaborator } from "@/types/project";

interface ShareModalProps {
  show: boolean;
  onClose: () => void;
  shareUrl: string;
  collaborators: Collaborator[];
  onChange: (collaborators: Collaborator[]) => void;
}

export default function ShareModal({ show, onClose, shareUrl, collaborators, onChange }: ShareModalProps) {

  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (show) setEmail("");
  }, [show]);

  const copy = () => {
    navigator.clipboard?.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const invite = () => {
    const address = email.trim();
    if (!address || collaborators.some((ix) => ix.email === address)) return;

    onChange([...collaborators, { id: `col-${Date.now()}`, email: address, role: "viewer" }]);
    setEmail("");
  };

  const setRole = (id: string, role: string) =>
    onChange(collaborators.map((ix) => (ix.id === id ? { ...ix, role } : ix)));

  const remove = (id: string) => onChange(collaborators.filter((ix) => ix.id !== id));

  return (
    <Modal
      show={show}
      size="S"
      icon={MdShare}
      title="Invite Collaborators"
      onClose={onClose}
      buttons={[
        { label: "Done", icon: MdCheck, type: "Primary", stretch: true, onClick: onClose },
        { label: "Cancel", type: "Tertiary", onClick: onClose },
      ]}
    >
      <div className="flex flex-col gap-5">

        <section className="flex flex-col gap-2">
          <p className={baseStyle.inlineRow}>
            <span className="font-bold">Share this link to any one</span>
            <span className="opacity-60 text-sm">(Public)</span>
          </p>

          <div className={`${baseStyle.inlineRow} border-color border rounded-md p-2`}>
            <MdOutlineLanguage size={20} className="opacity-60 shrink-0" />
            <span className="grow truncate text-sm">{shareUrl}</span>
            <Button type="Tertiary" size="Small" icon={copied ? MdCheck : MdContentCopy} onClick={copy} />
          </div>
        </section>


        <section className="flex flex-col gap-2">
          <h3 className="font-bold">Invite by email</h3>

          <div className={`${baseStyle.inlineRow} items-end`}>
            <Input
              id="inviteEmail"
              type="email"
              label="Enter email address to invite"
              placeholder="name@studio.com"
              value={email}
              onChange={setEmail}
            />
            <Button type="Secondary" label="Invite" onClick={invite} />
          </div>
        </section>


        <section className="flex flex-col gap-2">
          <h3 className="font-bold">{collaborators.length} people invited</h3>

          {collaborators.map((person) => (
            <div key={person.id} className={`${baseStyle.inlineRow} gap-3`}>

              <Avatar type="Initials" initial={person.email.charAt(0).toUpperCase()} />

              <span className="grow truncate text-sm" title={person.email}>{person.email}</span>

              <Input
                id={`role-${person.id}`}
                type="select"
                size="S"
                fit
                value={person.role}
                options={collaboratorRoleOptions}
                onChange={(role) => setRole(person.id, role)}
              />

              <Button type="Tertiary" size="Small" icon={MdClose} onClick={() => remove(person.id)} />
            </div>
          ))}
        </section>

      </div>
    </Modal>
  );
}
