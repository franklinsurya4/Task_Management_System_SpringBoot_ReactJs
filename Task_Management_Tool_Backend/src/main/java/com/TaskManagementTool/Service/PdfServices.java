package com.TaskManagementTool.Service;

import com.lowagie.text.*;
import com.lowagie.text.Font;
import com.lowagie.text.pdf.*;
import com.TaskManagementTool.Entity.Task;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
public class PdfServices {

    public ByteArrayInputStream generateTaskPdf(List<Task> tasks) {

        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {

            PdfWriter.getInstance(document, out);
            document.open();

            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
            Paragraph title = new Paragraph("Task Status Report", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);
            document.add(new Paragraph(" "));

            PdfPTable table = new PdfPTable(4);
            table.setWidthPercentage(100);
            table.setWidths(new int[]{3,2,2,2});

            addHeader(table, "Title");
            addHeader(table, "Status");
            addHeader(table, "Score");
            addHeader(table, "Due Date");

            for (Task task : tasks) {
                table.addCell(task.getTitle());
                table.addCell(task.getStatus());
                table.addCell(task.getScore() == null ? "-" : task.getScore().toString());
                table.addCell(task.getDueDate() == null ? "-" : task.getDueDate().toString());
            }

            document.add(table);
            document.close();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ByteArrayInputStream(out.toByteArray());
    }

    private void addHeader(PdfPTable table, String text) {

        PdfPCell header = new PdfPCell();
        header.setBackgroundColor(Color.LIGHT_GRAY);
        header.setPhrase(new Phrase(text));
        table.addCell(header);
    }
}