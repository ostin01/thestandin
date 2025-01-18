import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

interface FileInputFieldProps {
  handleFile: (file: File | null) => void;
  file: File | null;
  error?: boolean;
  disabled?: boolean;
  filename?: string;
  acceptType?: 'image' | 'document' | 'all';
}

const FileInputField: React.FC<FileInputFieldProps> = ({
  handleFile,
  file,
  error = false,
  disabled = false,
  filename = '',
  acceptType = 'all',
}) => {
  const [selectedFile, setSelectedFile] = useState(file);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type:
          acceptType === 'image'
            ? 'image/*'
            : acceptType === 'document'
              ? 'application/pdf'
              : '*/*',
        copyToCacheDirectory: false,
      });

      if (
        result.canceled === false &&
        result.assets &&
        result.assets.length > 0
      ) {
        const asset = result.assets[0];
        const file = {
          name: asset.name || 'Unknown file',
          type: asset.mimeType || 'application/octet-stream',
          uri: asset.uri,
        };
        setSelectedFile(file as unknown as File | null);
        handleFile(file as unknown as File | null);
      } else {
        console.log('Document picking canceled');
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 8,
        }}
      >
        {selectedFile ? (
          <Text style={{ color: 'black', fontSize: 14 }}>
            {selectedFile.name}
          </Text>
        ) : filename ? (
          <Text style={{ color: '#5DC95D', fontSize: 14 }}>{filename}</Text>
        ) : (
          <Text style={{ color: '#A8B8A8', fontSize: 14 }}>
            Upload a file here
          </Text>
        )}

        <TouchableOpacity
          style={{
            backgroundColor: '#F6F8F6',
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 6,
          }}
          onPress={pickDocument}
          disabled={disabled}
        >
          <Text style={{ color: '#5DC95D', fontSize: 16, fontWeight: '500' }}>
            Upload file
          </Text>
        </TouchableOpacity>
      </View>

      {error && (
        <Text style={{ color: 'red', fontSize: 12, marginTop: 8 }}>
          Error uploading file
        </Text>
      )}
    </View>
  );
};

export default FileInputField;
