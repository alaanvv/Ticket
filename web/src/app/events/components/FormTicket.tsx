"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoTicket } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

// Esquema de validação para um único ingresso (ticket)
const ticketSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres." }),
  allowHalf: z.coerce.boolean()
});

const FormTicket = () => {
  const [tickets, setTickets] = useState<z.infer<typeof ticketSchema>[]>([]);

  const methods = useForm({
    resolver: zodResolver(z.array(ticketSchema)), // Validação para o array de tickets
  });

  const addTicket = () => {
    setTickets([...tickets, { name: "", allowHalf: true }]);
  };

  const removeTicket = (index: number) => {
    setTickets(tickets.filter((_, i) => i !== index));
  };

  const onSubmit = (data: any) => {
    console.log("Tickets enviados:", data.tickets); // Acessa o array de tickets
  };

  return (
    <div>
      <h2 className="text-center scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-6">
        Ingressos
      </h2>

      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
          {tickets.map((ticket, index) => (
            <div key={index} className="space-y-4 border rounded-md p-4 shadow">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Ingresso {index + 1}</h3>
                <Button
                  className="rounded-full"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeTicket(index)}
                >
                  <IoMdClose className="text-xl" />
                </Button>
              </div>

              {/* Campos do formulário de ingresso */}
              <FormField
                control={methods.control}
                name={`tickets.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do ingresso" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name={`tickets.${index}.allowHalf`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Permitir meia</FormLabel>
                    <FormControl>
                      <Input type="checkbox" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}

          <Button
            className="flex items-center gap-1"
            type="button"
            onClick={addTicket}
          >
            <IoTicket className="text-lg" />
            Adicionar Ingresso
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FormTicket;
