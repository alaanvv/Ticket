"use client"; // Adicione esta linha no topo do arquivo

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  GoogleMap,
  MarkerF,
  useLoadScript,
  Autocomplete,
} from "@react-google-maps/api";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Esquema de validação
const formSchema = z.object({
  nome: z.string().min(1, { message: "Nome deve ter pelo menos 1 caractere." }),
  descricao: z.string().optional(),
  data_inicio: z.date({ message: "Data de início inválida." }),
  local: z.string().min(1, { message: "Local deve ter pelo menos 1 caractere." }),
  endereco: z.string().min(1, { message: "Endereço deve ter pelo menos 1 caracteres." }),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  imagem: z.optional(z.string().url({ message: "URL da imagem inválida." })),
});

const FormularioEvento = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      descricao: "",
      data_inicio: new Date(),
      local: "",
      endereco: "",
      latitude: undefined,
      longitude: undefined,
      imagem: "",
    },
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });

  const [markerPosition, setMarkerPosition] =
    useState<google.maps.LatLngLiteral | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const onPlaceChanged = () => {
    if (!autocompleteRef.current) return;
    const place = autocompleteRef.current.getPlace();

    if (!place || !place.geometry || !place.geometry.location)
      return console.error("Localização não encontrada para este lugar.");

    setMarkerPosition(place.geometry.location.toJSON());
    form.setValue("local", place.name || "");
    form.setValue("endereco", place.formatted_address || "");
    form.setValue("latitude", place.geometry.location.lat());
    form.setValue("longitude", place.geometry.location.lng());
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const onMapClick = (event: google.maps.MapMouseEvent) => {
    if (!event.latLng)
      return
    setMarkerPosition(event.latLng.toJSON());
    form.setValue("latitude", event.latLng.lat());
    form.setValue("longitude", event.latLng.lng());
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormMessage className="text-red-600" />
              <FormControl>
                <Input placeholder="Nome do evento" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormMessage className="text-red-500 m-0" />
              <FormControl>
                <Textarea
                  placeholder="Detalhes do evento"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="data_inicio"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data</FormLabel>
              <FormMessage className="text-red-500 m-0" />
              <FormControl>
                <DatePicker
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  showTimeSelect
                  dateFormat="dd/MM/yy HH:mm"
                  className="border rounded-md p-2 w-full cursor-default"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imagem"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imagem</FormLabel>
              <FormMessage className="text-red-500 m-0" />
              <FormControl>
                <Input placeholder="URL da imagem" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="local"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Local</FormLabel>
              <FormMessage className="text-red-500 m-0" />
              <FormControl>
                {isLoaded ? (
                  <Autocomplete
                    onLoad={(autocomplete) =>
                      (autocompleteRef.current = autocomplete)
                    }
                    onPlaceChanged={onPlaceChanged}
                  >
                    <Input placeholder="Local do evento" {...field} />
                  </Autocomplete>
                ) : (
                  <Input placeholder="Carregando mapa..." disabled />
                )}
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endereco"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço</FormLabel>
              <FormMessage className="text-red-500 m-0" />
              <FormControl>
                <Input placeholder="Endereço completo" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="latitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Latitude</FormLabel>
                <FormMessage className="text-red-500 m-0" />
                <FormControl>
                  <Input type="number"
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="Latitude" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="longitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Longitude</FormLabel>
                <FormMessage className="text-red-500 m-0" />
                <FormControl>
                  <Input type="number"
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="Longitude" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "400px" }}
            center={markerPosition || { lat: -14.235004, lng: -51.92528 }}
            zoom={4}
            onClick={onMapClick} // Adiciona o evento de clique no mapa
          >
            {markerPosition && <MarkerF position={markerPosition} />}
          </GoogleMap>
        )}
        <Button type="submit">Cadastrar</Button>
      </form>
    </Form>
  );
};

export default FormularioEvento;
