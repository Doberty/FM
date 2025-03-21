import type { CompetitionRule } from "../lib/wars-data"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import React from "react"

interface RulesSectionProps {
  rules: CompetitionRule[]
}

export function RulesSection({ rules }: RulesSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Competition Rules</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {rules.map((rule, index) => (
            <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
              <h3 className="font-medium mb-1">{rule.title}</h3>
              <p className="text-sm text-muted-foreground">{rule.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

