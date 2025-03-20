// app/documents/page.tsx
"use client"

import { useState, useRef } from "react"
import { Upload, File, Trash2 } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Document {
  id: string
  name: string
  type: string
  size: string
  uploadDate: Date
  category: "Lab Result" | "Prescription" | "Imaging" | "Vaccination" | "Other"
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "doc-1",
      name: "Blood Test Results.pdf",
      type: "PDF",
      size: "1.2 MB",
      uploadDate: new Date("2025-03-15"),
      category: "Lab Result"
    },
    {
      id: "doc-2",
      name: "Chest X-Ray Report.jpg",
      type: "JPG",
      size: "3.5 MB",
      uploadDate: new Date("2025-03-10"),
      category: "Imaging"
    },
    {
      id: "doc-3",
      name: "Medication Prescription.pdf",
      type: "PDF",
      size: "0.8 MB",
      uploadDate: new Date("2025-03-05"),
      category: "Prescription"
    }
  ])
  
  const [documentToDelete, setDocumentToDelete] = useState<Document | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [deleteSuccess, setDeleteSuccess] = useState(false)
  
  // Create refs for file inputs
  const fileInputRef = useRef<HTMLInputElement>(null)
  const emptyStateFileInputRef = useRef<HTMLInputElement>(null)

  const handleDelete = () => {
    if (documentToDelete) {
      setDocuments(documents.filter(doc => doc.id !== documentToDelete.id))
      setDocumentToDelete(null)
      setDeleteSuccess(true)
      setTimeout(() => setDeleteSuccess(false), 3000)
    }
  }

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      
      // Create a new document entry
      const newDocument: Document = {
        id: `doc-${Date.now()}`,
        name: file.name,
        type: file.name.split('.').pop()?.toUpperCase() || "Unknown",
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadDate: new Date(),
        category: "Other"
      }
      
      setDocuments([newDocument, ...documents])
      setUploadSuccess(true)
      setTimeout(() => setUploadSuccess(false), 3000)
      
      // Reset the file input
      e.target.value = ""
    }
  }

  // Function to trigger file input click
  const triggerFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  
  // Function to trigger file input click for empty state
  const triggerEmptyStateFileUpload = () => {
    if (emptyStateFileInputRef.current) {
      emptyStateFileInputRef.current.click()
    }
  }

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <File className="text-red-500" />
      case "JPG":
      case "PNG":
        return <File className="text-blue-500" />
      default:
        return <File className="text-gray-500" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Lab Result":
        return "bg-blue-100 text-blue-700"
      case "Prescription":
        return "bg-purple-100 text-purple-700"
      case "Imaging":
        return "bg-amber-100 text-amber-700"
      case "Vaccination":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="container mx-auto py-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Health Documents</h1>
          <p className="text-gray-500 mt-1">
            Upload and manage your personal health records
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button onClick={triggerFileUpload}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
          <input 
            ref={fileInputRef}
            type="file" 
            className="hidden" 
            onChange={handleUpload}
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          />
        </div>
      </div>
      
      {uploadSuccess && (
        <Alert className="mb-4 bg-green-50 border-green-400">
          <AlertDescription className="text-green-700">
            Document uploaded successfully
          </AlertDescription>
        </Alert>
      )}
      
      {deleteSuccess && (
        <Alert className="mb-4 bg-red-50 border-red-400">
          <AlertDescription className="text-red-700">
            Document deleted successfully
          </AlertDescription>
        </Alert>
      )}
      
      {documents.length === 0 ? (
        <Card className="border-dashed border-2">
          <CardContent className="pt-6 text-center">
            <div className="flex flex-col items-center justify-center py-12">
              <File className="h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-1">No documents yet</h3>
              <p className="text-gray-500 mb-4">
                Upload your health documents to keep them organized in one place
              </p>
              <Button variant="outline" onClick={triggerEmptyStateFileUpload}>
                <Upload className="mr-2 h-4 w-4" />
                Upload your first document
              </Button>
              <input 
                ref={emptyStateFileInputRef}
                type="file" 
                className="hidden" 
                onChange={handleUpload}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              />
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>My Documents ({documents.length})</CardTitle>
            <CardDescription>
              Securely stored and accessible anytime
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-sm">Document</th>
                    <th className="text-left py-3 px-4 font-medium text-sm hidden md:table-cell">Category</th>
                    <th className="text-left py-3 px-4 font-medium text-sm hidden sm:table-cell">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-sm hidden lg:table-cell">Size</th>
                    <th className="text-right py-3 px-4 font-medium text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((document) => (
                    <tr key={document.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          {getDocumentIcon(document.type)}
                          <div>
                            <div className="font-medium">{document.name}</div>
                            <div className="text-xs text-gray-500 md:hidden">{document.category}</div>
                            <div className="text-xs text-gray-500 sm:hidden">
                              {format(document.uploadDate, "MMM d, yyyy")}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 hidden md:table-cell">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(document.category)}`}>
                          {document.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-500 hidden sm:table-cell">
                        {format(document.uploadDate, "MMM d, yyyy")}
                      </td>
                      <td className="py-3 px-4 text-gray-500 hidden lg:table-cell">
                        {document.size}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M8 3.5C8.82843 3.5 9.5 2.82843 9.5 2C9.5 1.17157 8.82843 0.5 8 0.5C7.17157 0.5 6.5 1.17157 6.5 2C6.5 2.82843 7.17157 3.5 8 3.5Z" fill="currentColor"/>
                                <path d="M8 9.5C8.82843 9.5 9.5 8.82843 9.5 8C9.5 7.17157 8.82843 6.5 8 6.5C7.17157 6.5 6.5 7.17157 6.5 8C6.5 8.82843 7.17157 9.5 8 9.5Z" fill="currentColor"/>
                                <path d="M8 15.5C8.82843 15.5 9.5 14.8284 9.5 14C9.5 13.1716 8.82843 12.5 8 12.5C7.17157 12.5 6.5 13.1716 6.5 14C6.5 14.8284 7.17157 15.5 8 15.5Z" fill="currentColor"/>
                              </svg>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Button variant="ghost" className="w-full justify-start p-0 h-auto" onClick={() => {}}>
                                View
                              </Button>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Button variant="ghost" className="w-full justify-start p-0 h-auto" onClick={() => {}}>
                                Download
                              </Button>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" className="w-full justify-start text-red-500 p-0 h-auto" onClick={() => setDocumentToDelete(document)}>
                                    Delete
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Confirm Deletion</DialogTitle>
                                    <DialogDescription asChild>
                                      <div>
                                        Are you sure you want to delete this document?
                                      </div>
                                    </DialogDescription>
                                  </DialogHeader>
                                  
                                  <div className="mt-4 py-3 px-4 bg-gray-50 rounded-md">
                                    <div className="flex items-center gap-3">
                                      {getDocumentIcon(document.type)}
                                      <div className="font-medium">{document.name}</div>
                                    </div>
                                  </div>
                                  
                                  <DialogFooter className="flex space-x-2 justify-end mt-4">
                                    <DialogClose asChild>
                                      <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <Button 
                                      variant="destructive" 
                                      onClick={() => handleDelete()}
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete Document
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}