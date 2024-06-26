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
import { FaPlus } from "react-icons/fa";
import FormTicket from "../../components/FormTicket";

// Esquema de validação
const formSchema = z.object({
  name: z.string().min(1, { message: "Nome deve ter pelo menos 1 caractere." }),
  description: z.string().optional(),
  startDate: z.date({ message: "Data de início inválida." }),
  location: z.string().min(1, { message: "Local deve ter pelo menos 1 caractere." }),
  address: z.string().min(1, { message: "Endereço deve ter pelo menos 1 caracteres." }),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  image: z.optional(z.string().url({ message: "URL da imagem inválida." })),
});

const EventForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      startDate: new Date(),
      location: "",
      address: "",
      latitude: undefined,
      longitude: undefined,
      image: "",
    },
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });

  const [markerPosition, setMarkerPosition] =
    useState<google.maps.LatLngLiteral | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const handlePlaceChanged = () => {
    if (!autocompleteRef.current)
      return

    const place = autocompleteRef.current.getPlace();
    if (!place || !place.geometry || !place.geometry.location)
      return console.error("Location not found for this place.");

    setMarkerPosition(place.geometry.location.toJSON());
    form.setValue("location", place.name || "");
    form.setValue("address", place.formatted_address || "");
    form.setValue("latitude", place.geometry.location.lat());
    form.setValue("longitude", place.geometry.location.lng());
  };

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (!event.latLng)
      return
    setMarkerPosition(event.latLng.toJSON());
    form.setValue("latitude", event.latLng.lat());
    form.setValue("longitude", event.latLng.lng());
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
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
          name="description"
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
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data de Início</FormLabel>
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
          name="image"
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
          name="location"
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
                    onPlaceChanged={handlePlaceChanged}
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
          name="address"
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
                  <Input type="number" placeholder="Latitude" className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" {...field} />
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
                  <Input type="number" placeholder="Longitude" className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "400px" }}
            center={markerPosition || { lat: -14.235004, lng: -51.92528 }} // Centro inicial do mapa (Brasil)
            zoom={4}
            onClick={handleMapClick} // Adiciona o evento de clique no mapa
          >
            {markerPosition && <MarkerF position={markerPosition} />}
          </GoogleMap>
        )}
        <FormTicket />
        <Button className="flex items-center gap-1" type="submit">
          <FaPlus  />
          Cadastrar
        </Button>
      </form>
    </Form>
  );
};

export default EventForm;
