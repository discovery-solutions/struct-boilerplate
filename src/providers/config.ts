"use client";
import { Dialog, DialogDescription, DialogHeader, DialogTitle, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MultiSelectField } from "@/components/ui/select/multi";
import { InputFileOpenAI } from "@/components/ui/input/file-openai";
import { StructUIConfig } from "@discovery-solutions/struct/client";
import { AvatarUpload } from "@/components/ui/input/avatar";
import { QueryClient } from "@tanstack/react-query";
import { ImageUpload } from "@/components/ui/input/image";
import { SelectField } from "@/components/ui/select/field";
import { ModelSelect } from "@/components/ui/select/model";
import { DatePicker } from "@/components/ui/input/date";
import { FileUpload } from "@/components/ui/input/file";
import { InputTags } from "@/components/ui/input/tags";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "lucide-react";
import { Select } from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Markdown } from "@/components/markdown";

export const queryClient = new QueryClient()

export const config: StructUIConfig = {
  MultiSelect: MultiSelectField,
  AvatarUpload: AvatarUpload,
  ModelSelect: ModelSelect,
  FileOpenAI: InputFileOpenAI,
  FileUpload: FileUpload,
  DatePicker: DatePicker,
  ImageUpload: ImageUpload,
  Textarea: Textarea,
  Select: Select,
  Toggle: Toggle,
  Checkbox: Checkbox,
  InputTags: InputTags,
  SelectField: SelectField,
  Markdown: Markdown,
  Loader: Loader,
  Button: Button,
  Input: Input,
  Table: {
    Root: Table,
    Header: TableHeader,
    Body: TableBody,
    Row: TableRow,
    Head: TableHead,
    Cell: TableCell,
  },
  Card: {
    Header: CardHeader,
    Content: CardContent,
    Title: CardTitle,
    Description: CardDescription,
  },
  Dialog: {
    Root: Dialog,
    Trigger: DialogTrigger,
    Content: DialogContent,
    Header: DialogHeader,
    Title: DialogTitle,
    Footer: DialogFooter,
    Description: DialogDescription,
  },
  Dropdown: {
    Root: DropdownMenu,
    Trigger: DropdownMenuTrigger,
    Content: DropdownMenuContent,
    Item: DropdownMenuItem,
  },
  queryClient: queryClient,
  toast: toast,
  alias: {
    "model-select": "ModelSelect",
    multiselect: "MultiSelect",
    password: "Input",
    text: "Input",
    date: "DatePicker",
    tags: "InputTags",
    number: "Input",
    avatar: "AvatarUpload",
    image: "ImageUpload",
    select: "SelectField",
    markdown: "Markdown",
    toggle: "Toggle",
    // radio: () => <div>TODO: RadioGroup</div>,
    checkbox: "Checkbox",
    textarea: "Textarea",
    file: "FileUpload",
    "file-openai": "FileOpenAI",
    document: "FileUpload",
  }
}