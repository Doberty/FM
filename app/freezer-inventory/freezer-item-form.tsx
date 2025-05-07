"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Beef, Carrot, Package } from "lucide-react"
import type { FreezerItem } from "../../lib/types"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  type: z.enum(["protein", "vegetable", "other"], {
    required_error: "Please select a type.",
  }),
  quantity: z.string().optional(),
})

interface FreezerItemFormProps {
  onSubmit: (data: Omit<FreezerItem, "id" | "consumed">) => void
  onCancel: () => void
}

export function FreezerItemForm({ onSubmit, onCancel }: FreezerItemFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "protein",
      quantity: "",
    },
  })

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit({
      ...values,
      dateAdded: new Date(),
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">Add New Freezer Item</h2>
        <p className="text-muted-foreground">Track what&apos;s in your freezer to reduce food waste</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Name</FormLabel>
                <FormControl>
                  <Input placeholder="Chicken breast, frozen peas, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Item Type</FormLabel>
                <FormControl>
                  <Tabs defaultValue={field.value} onValueChange={field.onChange} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="protein" className="flex items-center gap-2">
                        <Beef className="h-4 w-4" />
                        <span>Protein</span>
                      </TabsTrigger>
                      <TabsTrigger value="vegetable" className="flex items-center gap-2">
                        <Carrot className="h-4 w-4" />
                        <span>Vegetable</span>
                      </TabsTrigger>
                      <TabsTrigger value="other" className="flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        <span>Other</span>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input placeholder="500g, 2 pieces, etc." {...field} />
                </FormControl>
                <FormDescription>Specify the amount or number of items</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-4">
            <Button variant="outline" type="button" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Add Item</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
