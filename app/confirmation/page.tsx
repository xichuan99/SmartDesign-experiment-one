"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useFormStore } from "@/store/useFormStore";
import { RefreshCw, Edit2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ConfirmationPage() {
  const router = useRouter();
  const { setFormData, ...storeData } = useFormStore();
  
  const [isEditing, setIsEditing] = useState(false);

  // Form states for inline editing
  const [designPurpose, setDesignPurpose] = useState(storeData.designPurpose || "");
  const [platform, setPlatform] = useState(storeData.platform || "");
  const [platformOther, setPlatformOther] = useState(storeData.platformOther || "");
  const [textContent, setTextContent] = useState(storeData.textContent || "");
  
  // Basic file states
  const [likedReferences, setLikedReferences] = useState<File[]>(storeData.likedReferences || []);
  const [dislikedReferences, setDislikedReferences] = useState<File[]>(storeData.dislikedReferences || []);

  // Detailed order states
  const [businessName, setBusinessName] = useState(storeData.businessName || "");
  const [logo, setLogo] = useState<File | null>(storeData.logo || null);
  const [customWidth, setCustomWidth] = useState(storeData.customWidth || "");
  const [customHeight, setCustomHeight] = useState(storeData.customHeight || "");
  const [customUnit, setCustomUnit] = useState(storeData.customUnit || "");
  const [focusTags, setFocusTags] = useState(storeData.focusTags || "");
  const [ctaTags, setCtaTags] = useState(storeData.ctaTags || "");

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

  const handleUpdate = () => {
    // In a real app, this would trigger AI re-process
    // Update store with new values
    setFormData({
      ...storeData,
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
    // Back to view state
    setIsEditing(false);
  };

  const handleGenerate = () => {
    router.push("/result");
  };

  return (
    <div className="container max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">Konfirmasi Brief</h1>

      {/* Summary Section */}
      <div className="border rounded-lg p-6 bg-card text-card-foreground shadow-sm relative">
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">Summary Interpretasi AI</h2>
            <p className="text-sm text-muted-foreground">
              Pemahaman AI atas brief Anda: tujuan, platform, hierarki teks, dan tone yang diinferensi.
            </p>
          </div>
          {!isEditing && (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Brief
            </Button>
          )}
        </div>

        <div className="bg-muted p-4 rounded-md mb-6">
          <p className="text-sm">
            Berdasarkan input Anda, desain ini ditujukan untuk <strong>{designPurpose || "promosi produk"}</strong> 
            pada platform <strong>{platform || "Instagram"}</strong>. Teks utama difokuskan pada pesan inti dengan 
            gaya visual yang profesional dan modern, mengutamakan keterbacaan yang tinggi untuk audiens target.
          </p>
        </div>

        {/* Edit State: Inline Form */}
        {isEditing && (
          <div className="space-y-6 border-t pt-6 mt-4">
            <h3 className="font-medium text-lg">Edit Informasi Brief</h3>
            
            {/* 1. Tujuan Desain */}
            <div className="space-y-2">
              <Label htmlFor="designPurpose">Tujuan Desain</Label>
              <Input 
                id="designPurpose" 
                placeholder="Contoh: poster promosi, konten media sosial, banner toko" 
                value={designPurpose}
                onChange={(e) => setDesignPurpose(e.target.value)}
              />
            </div>

            {/* 2. Platform */}
            <div className="space-y-2">
              <Label htmlFor="platform">Akan dipakai di mana?</Label>
              <Select value={platform} onValueChange={setPlatform}>
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
              />
            </div>

            {/* 4. Referensi Disukai */}
            <div className="space-y-2">
              <Label htmlFor="likedReferences">Referensi yang disukai (Opsional)</Label>
              {likedReferences.length > 0 && (
                <p className="text-sm text-muted-foreground mb-2">
                  {likedReferences.length} file terpilih. Upload lagi untuk mengganti.
                </p>
              )}
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
              {dislikedReferences.length > 0 && (
                <p className="text-sm text-muted-foreground mb-2">
                  {dislikedReferences.length} file terpilih. Upload lagi untuk mengganti.
                </p>
              )}
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
                    {logo && (
                      <p className="text-sm text-muted-foreground mb-2">
                        1 file terpilih: {logo.name}. Upload lagi untuk mengganti.
                      </p>
                    )}
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

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="ghost" onClick={() => setIsEditing(false)}>Batal</Button>
              <Button onClick={handleUpdate}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Update & Re-process
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* View State: Moodboard */}
      {!isEditing && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Moodboard Visual</h2>
            <p className="text-sm text-muted-foreground">
              Berikut adalah referensi tone dan palet warna berdasarkan analisis brief Anda (bukan referensi layout).
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* Placeholder images for Moodboard */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-muted rounded-md overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={`https://picsum.photos/seed/${i * 10 + 5}/400/400`} 
                  alt={`Moodboard reference ${i}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-6">
            <Button size="lg" onClick={handleGenerate}>
              Generate Desain
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

