"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronRight } from "lucide-react";

const PhoneNumber = () => {
  const [phone, setPhone] = useState("");

  return (
    <PhoneInput
      placeholder="Numéro de téléphone"
      defaultCountry="DZ"
      value={phone}
      onChange={(value) => {
        setPhone(value);
      }}
    />
  );
};

export default PhoneNumber;
