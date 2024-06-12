-- AddForeignKey
ALTER TABLE "ChatEmbeddings" ADD CONSTRAINT "ChatEmbeddings_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "Clientes"("cliente_id") ON DELETE RESTRICT ON UPDATE CASCADE;
