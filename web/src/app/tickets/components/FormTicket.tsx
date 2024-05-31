import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import NumberFormat, { NumberFormatBase } from "react-number-format"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Esquema de validação atualizado
const formSchema = z.object({
  tipo: z.enum(["meia", "inteira", "vip"], {
    errorMap: () => ({ message: "Selecione um tipo válido." }),
  }),
  preco: z.number().min(0.01, { message: "Preço deve ser maior que zero." }),
  quantidadeDisponivel: z.number().int().min(0, { message: "Quantidade deve ser um número inteiro positivo." }),
})

const Formulario = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tipo: "meia", // Valor padrão para o tipo
      preco: 0, // Valor padrão para o preço
      quantidadeDisponivel: 0, // Valor padrão para a quantidade
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="tipo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="meia">Meia</SelectItem>
                  <SelectItem value="inteira">Inteira</SelectItem>
                  <SelectItem value="vip">VIP</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="preco"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço</FormLabel>
              <FormControl>
                <NumberFormatBase
                  value={field.value}
                  onValueChange={(values) => {
                    const { floatValue } = values
                    if (floatValue !== undefined) {
                      field.onChange(floatValue)
                    }
                  }}
                  decimalSeparator=","
                  prefix="R$ "
                  className="border rounded-md p-2 w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantidadeDisponivel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantidade Disponível</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Quantidade" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  )
}

export default Formulario
