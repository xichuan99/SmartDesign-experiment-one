"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormStore } from "@/store/useFormStore";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FormPage() {
  const router = useRouter();
  const { setFormData, ...storeData } = useFormStore();

  // Local state for the form
  const [designPurpose, setDesignPurpose] = useState(storeData.designPurpose);
  const [platform, setPlatform] = useState(storeData.platform);
  const [platformOther, setPlatformOther] = useState(storeData.platformOther);
  const [textContent, setTextContent] = useState(storeData.textContent);
  
  // Basic file states (for prototype, just storing the files)
  const [likedReferences, setLikedReferences] = useState<File[]>(storeData.likedReferences);
  const [dislikedReferences, setDislikedReferences] = useState<File[]>(storeData.dislikedReferences);

  // Detailed order states
  const [businessName, setBusinessName] = useState(storeData.businessName);
  const [logo, setLogo] = useState<File | null>(storeData.logo);
  const [customWidth, setCustomWidth] = useState(storeData.customWidth);
  const [customHeight, setCustomHeight] = useState(storeData.customHeight);
  const [customUnit, setCustomUnit] = useState(storeData.customUnit);
  const [focusTags, setFocusTags] = useState(storeData.focusTags);
  const [ctaTags, setCtaTags] = useState(storeData.ctaTags);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to Zustand
    setFormData({
      designPurpose,
      platform,
      platformOther,
      textContent,
      likedReferences,
      dislikedReferences,
      businessName,
      logo,
      customWidth,
      customHeight,
      customUnit,
      focusTags,
      ctaTags,
    });

    // Navigate to confirmation page
    router.push("/confirmation");
  };

  const handleMultipleFiles = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<File[]>>) => {
    if (e.target.files) {
      setter(Array.from(e.target.files));
    }
  };

  const handleSingleFile = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (e.target.files && e.target.files.length > 0) {
      setter(e.target.files[0]);
    } else {
      setter(null);
    }
  };

  return (
    <div className="container max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Brief Desain</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* 1. Tujuan Desain */}
        <div className="space-y-2">
          <Label htmlFor="designPurpose">Tujuan Desain</Label>
          <Input 
            id="designPurpose" 
            placeholder="Contoh: poster promosi, konten media sosial, banner toko" 
            value={designPurpose}
            onChange={(e) => setDesignPurpose(e.target.value)}
            required
          />
        </div>

        {/* 2. Platform */}
        <div className="space-y-2">
          <Label htmlFor="platform">Akan dipakai di mana?</Label>
          <Select value={platform} onValueChange={setPlatform} required>
            <SelectTrigger>
              <SelectValue placeholder="Pilih platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Post IG">Post IG</SelectItem>
              <SelectItem value="Story IG">Story IG</SelectItem>
              <SelectItem value="Banner Toko">Banner Toko</SelectItem>
              <SelectItem value="X-Banner">X-Banner</SelectItem>
              <SelectItem value="Lainnya">Lainnya</SelectItem>
            </SelectContent>
          </Select>
          
          {platform === "Lainnya" && (
            <Input 
              placeholder="Sebutkan platform lainnya" 
              value={platformOther}
              onChange={(e) => setPlatformOther(e.target.value)}
              className="mt-2"
              required
            />
          )}
        </div>

        {/* 3. Teks / Isi Desain */}
        <div className="space-y-2">
          <Label htmlFor="textContent">Teks / Isi Desain</Label>
          <Textarea 
            id="textContent" 
            placeholder="Semua teks yang harus muncul di desain" 
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            rows={4}
            required
          />
        </div>

        {/* 4. Referensi Disukai */}
        <div className="space-y-2">
          <Label htmlFor="likedReferences">Referensi yang disukai (Opsional)</Label>
          <p className="text-sm text-muted-foreground mb-2">Semakin relevan referensinya, semakin akurat hasil desainnya.</p>
          <Input 
            id="likedReferences" 
            type="file" 
            multiple 
            accept="image/*"
            onChange={(e) => handleMultipleFiles(e, setLikedReferences)}
          />
        </div>

        {/* 5. Referensi Tidak Disukai */}
        <div className="space-y-2">
          <Label htmlFor="dislikedReferences">Referensi yang tidak disukai (Opsional)</Label>
          <p className="text-sm text-muted-foreground mb-2">Semakin relevan referensinya, semakin akurat hasil desainnya.</p>
          <Input 
            id="dislikedReferences" 
            type="file" 
            multiple 
            accept="image/*"
            onChange={(e) => handleMultipleFiles(e, setDislikedReferences)}
          />
        </div>

        {/* Order Lebih Detail */}
        <Accordion type="single" collapsible className="w-full border rounded-lg p-2">
          <AccordionItem value="detailed-order" className="border-none">
            <AccordionTrigger className="text-md font-semibold px-2 hover:no-underline">
              Order Lebih Detail
            </AccordionTrigger>
            <AccordionContent className="space-y-4 px-2 pt-4">
              
              <div className="space-y-2">
                <Label htmlFor="businessName">Nama Usaha</Label>
                <Input 
                  id="businessName" 
                  placeholder="Nama usaha Anda" 
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo">Upload Logo</Label>
                <Input 
                  id="logo" 
                  type="file" 
                  accept=".png,.jpg,.jpeg,.svg"
                  onChange={(e) => handleSingleFile(e, setLogo)}
                />
              </div>

              <div className="space-y-2">
                <Label>Ukuran Khusus</Label>
                <div className="grid grid-cols-3 gap-4">
                  <Input 
                    type="number" 
                    placeholder="Width" 
                    value={customWidth}
                    onChange={(e) => setCustomWidth(e.target.value)}
                  />
                  <Input 
                    type="number" 
                    placeholder="Height" 
                    value={customHeight}
                    onChange={(e) => setCustomHeight(e.target.value)}
                  />
                  <Select value={customUnit} onValueChange={setCustomUnit}>
                    <SelectTrigger>
                      <SelectValue placeholder="Satuan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="px">px</SelectItem>
                      <SelectItem value="cm">cm</SelectItem>
                      <SelectItem value="mm">mm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="focusTags">Penekanan Bagian</Label>
                <Input 
                  id="focusTags" 
                  placeholder="pisahkan dengan koma (contoh: GRATIS!, diskon 90%)" 
                  value={focusTags}
                  onChange={(e) => setFocusTags(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ctaTags">Call To Action (CTA)</Label>
                <Input 
                  id="ctaTags" 
                  placeholder="pisahkan dengan koma (contoh: Beli Sekarang!, Hubungi Kami!)" 
                  value={ctaTags}
                  onChange={(e) => setCtaTags(e.target.value)}
                />
              </div>

            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button type="submit" className="w-full">
          Submit Brief
        </Button>

      </form>
    </div>
  );
}
