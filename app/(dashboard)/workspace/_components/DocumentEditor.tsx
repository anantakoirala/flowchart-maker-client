"use client";
import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import { useDispatch, useSelector } from "react-redux";
import { setDocument } from "@/redux/file/flieSlice";
import { RootState } from "@/redux/store";
import debounce from "lodash.debounce";
import {
  useLazyGetIndividualFileDataQuery,
  useUpdateFileMutation,
} from "@/redux/file/fileApi";
import { useParams, useSearchParams } from "next/navigation";

type Props = {};

const DocumentEditor = (props: Props) => {
  const dispatch = useDispatch();
  const { fileId } = useParams();
  const { document } = useSelector((state: RootState) => state.file);
  const [updateFile, { isLoading, isSuccess, isError, error }] =
    useUpdateFileMutation();

  const [trigger, { data: teamFilesData, isSuccess: gettingFileDataSuccess }] =
    useLazyGetIndividualFileDataQuery();
  const editorInstance = useRef<EditorJS | null>(null);

  const initEditor = () => {
    editorInstance.current = new EditorJS({
      tools: {
        header: {
          class: Header as any,
          shortcut: "CMD+SHIFT+H",
          config: {
            placeholder: "Enter a header",
          },
        },
        image: {
          class: ImageTool,
          config: {
            uploader: {
              uploadByFile(file: File) {
                return new Promise((resolve, reject) => {
                  const reader = new FileReader();

                  reader.onloadend = () => {
                    resolve({
                      success: 1,
                      file: {
                        url: reader.result as string, // Base64 string
                      },
                    });
                  };

                  reader.onerror = reject;
                  reader.readAsDataURL(file); // Convert file to Base64
                });
              },
            },
          },
        },
      },
      holder: "editorjs",
      placeholder: "Write something...",
      data: document ? JSON.parse(document) : {},
      onChange: async () => {
        if (editorInstance.current) {
          try {
            const savedData = await editorInstance.current.save();

            dispatch(setDocument(JSON.stringify(savedData)));
          } catch (error) {
            console.error("Failed to fetch editor data:", error);
          }
        }
      },
    });
  };

  useEffect(() => {
    const debouncedFunction = debounce(() => {
      updateFile({
        id: fileId, // File ID
        data: { document: document }, // Data to update
      });
    }, 500);

    // Invoke the debounced function
    debouncedFunction();

    // Cleanup function to cancel the debounced function if component unmounts
    return () => {
      debouncedFunction.cancel();
    };
  }, [document]);

  // Getting individual file data
  useEffect(() => {
    if (fileId) {
      trigger(fileId);
    }
  }, [fileId]);

  useEffect(() => {
    if (gettingFileDataSuccess) {
      initEditor();
    }

    // Cleanup EditorJS instance on unmount
    return () => {
      if (editorInstance.current) {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  }, [gettingFileDataSuccess]);

  return (
    <div className="h-full p-4">
      <div className="overflow-y-auto h-full border-2" id="editorjs"></div>
    </div>
  );
};

export default DocumentEditor;
